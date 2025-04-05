import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
  try {
    console.log("ImageKit Auth - Using credentials:", {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY?.slice(0, 5) + "...",
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    });

    const authenticationParameters = imagekit.getAuthenticationParameters();
    console.log("ImageKit Auth - Generated parameters:", authenticationParameters);

    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined
      },
      {
        status: 500,
      }
    );
  }
}
