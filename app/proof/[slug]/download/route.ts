import { getProofArtifact, buildProofArtifactDownload } from "@/lib/proof-package";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const artifact = getProofArtifact(slug);

  if (!artifact) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(buildProofArtifactDownload(artifact), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="sembla-${artifact.slug}-sample.txt"`,
    },
  });
}
