const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type ReplicateInput = {
  imageUrl: string;
  prompt: string;
  style?: string;
};

export const runReplicate = async ({ imageUrl, prompt, style }: ReplicateInput) => {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return {
      output: imageUrl,
      descriptor: `${style || "edgy"} draft (offline)`
    };
  }

  const version =
    process.env.REPLICATE_MODEL_VERSION ||
    "7de2ea26c616d5bf2245ad0d5d01afc78ab0c796b3f1ce0aa0ee9c14df9b8c48"; // sdxl base

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version,
      input: {
        image: imageUrl,
        prompt,
        negative_prompt: "blurry, low quality, watermark",
        prompt_strength: 0.85
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Replicate request failed: ${errorText}`);
  }

  const prediction = await response.json();
  let status = prediction.status;
  let output = prediction.output;
  let attempts = 0;

  while (!output && status !== "failed" && attempts < 12) {
    await sleep(2500);
    const poll = await fetch(prediction.urls.get, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const next = await poll.json();
    status = next.status;
    output = next.output;
    attempts += 1;
  }

  if (status === "failed" || !output?.[0]) {
    throw new Error("Replicate generation failed.");
  }

  return {
    output: Array.isArray(output) ? output[0] : output,
    descriptor: style || prompt
  };
};
