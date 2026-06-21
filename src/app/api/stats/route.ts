import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let bioVal = 148;
    let hookVal = 342;
    let captionVal = 219;

    // Check if Upstash environment variables exist
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });

      const values = await redis.mget<string[]>("stats:bio", "stats:hook", "stats:caption");
      
      // Parse values, fallback to custom starting values if null (for clean aesthetics rather than starting at 0)
      bioVal = parseInt(values[0] || "148", 10);
      hookVal = parseInt(values[1] || "342", 10);
      captionVal = parseInt(values[2] || "219", 10);
    }

    return NextResponse.json({
      bio: bioVal,
      hook: hookVal,
      caption: captionVal
    });
  } catch (error) {
    console.error("Error fetching redis stats:", error);
    // Fallback to static numbers on error so the section never throws
    return NextResponse.json({
      bio: 148,
      hook: 342,
      caption: 219
    });
  }
}
