import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

/**
 * Issues short-lived client tokens so the browser can upload a voice note
 * straight to the private Blob store (voice notes can exceed the 4.5 MB
 * function body limit, so they never pass through our function).
 */

// Five minutes of Opus at 64 kbps is ~2.4 MB; leave room for browsers that
// record at higher bitrates (Safari's AAC) without allowing arbitrary files.
const MAX_BYTES = 25 * 1024 * 1024;

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("requests/")) {
          throw new Error("Uploads are limited to request voice notes.");
        }
        return {
          allowedContentTypes: ["audio/webm", "audio/mp4", "audio/ogg", "audio/mpeg", "audio/x-m4a", "audio/aac"],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
        };
      },
    });
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Upload refused." }, { status: 400 });
  }
}
