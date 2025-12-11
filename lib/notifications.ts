type AlertPayload = {
  imageUrl: string;
  licenseToken: string;
  descriptor?: string;
  qr?: string;
};

export const sendDiscordWebhook = async ({ imageUrl, licenseToken, descriptor, qr }: AlertPayload) => {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `New SEMBLA avatar created — token: ${licenseToken}`,
      embeds: [
        {
          title: "Face Value ready",
          description: descriptor || "New avatar",
          image: { url: imageUrl },
          fields: [
            { name: "License token", value: licenseToken },
            { name: "QR campaign", value: qr || "organic" }
          ]
        }
      ]
    })
  });
};
