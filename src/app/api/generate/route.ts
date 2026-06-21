import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Redis } from "@upstash/redis";
import { generateBio, generateHooks, generateCaption } from "../../../data/prompts";

// Initialize Upstash Redis client if credentials exist
let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tool, input } = body;

    if (!tool || !input) {
      return NextResponse.json(
        { error: "Missing required fields 'tool' or 'input'" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Using local fallback templates.");
      return handleFallback(tool, input);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let systemInstruction = "";
    let promptText = "";

    if (tool === "bio") {
      const { profession, interests, personality, targetAudience, style } = input;
      systemInstruction = "You are a professional social media branding specialist. Generate a JSON object containing seven fields: 'minimal' (a minimalist-style creator bio), 'professional' (an expert, value-driven bio), 'luxury' (an elegant/luxury storytelling bio), 'clarityScore' (a number 1-100 indicating readability), 'authorityScore' (a number 1-100 indicating credibility), 'conversionScore' (a number 1-100 indicating call-to-action impact), and 'hashtags' (a line of 3-4 trending hashtags). Ensure the output is valid JSON.";
      promptText = `Create creator bios using these details:
- Profession/Niche: ${profession}
- Interests: ${interests}
- Personality/Tone: ${personality}
- Target Audience: ${targetAudience || "General social media audience"}
- Bio Style Category: ${style}
Format:
{
  "minimal": "...",
  "professional": "...",
  "luxury": "...",
  "clarityScore": 92,
  "authorityScore": 88,
  "conversionScore": 95,
  "hashtags": "..."
}`;
    } else if (tool === "hooks") {
      const { topic, audience, platform } = input;
      systemInstruction = "You are a viral social media hook copywriter. Generate a JSON object containing a single field 'hooks', which is an array of exactly 10 high-converting scroll-stopping hook lines custom-fit for the specified platform and audience. Ensure the output is valid JSON.";
      promptText = `Create 10 viral hooks for:
- Topic/Niche: ${topic}
- Target Audience: ${audience}
- Platform: ${platform}
Format:
{
  "hooks": [
    "Hook 1...",
    "Hook 2...",
    ...
  ]
}`;
    } else if (tool === "captions") {
      const { topic, tone, platform } = input;
      systemInstruction = "You are a social media manager. Generate a JSON object containing three fields: 'storyStyle' (a caption containing a personal, engaging story), 'authorityStyle' (an educational, structured caption demonstrating expertise), and 'funnyStyle' (a witty, lighthearted, or sarcastic caption). Include appropriate spacing, emojis, and hashtags at the bottom. Ensure the output is valid JSON.";
      promptText = `Create 3 captions for:
- Topic/Concept: ${topic}
- Tone/Vibe: ${tone}
- Platform: ${platform}
Format:
{
  "storyStyle": "...",
  "authorityStyle": "...",
  "funnyStyle": "..."
}`;
    } else {
      return NextResponse.json(
        { error: `Invalid tool type '${tool}'` },
        { status: 400 }
      );
    }

    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: `${systemInstruction}\n\n${promptText}` }] }
      ],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const text = result.response.text();
    const cleanText = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    const data = JSON.parse(cleanText);

    // Track statistics asynchronously in Redis
    if (redis) {
      const keyMap: Record<string, string> = {
        bio: "bio",
        hooks: "hook",
        captions: "caption"
      };
      const key = keyMap[tool] || tool;
      redis.incr(`stats:${key}`).catch((err) => console.error("Redis incr error:", err));
    }

    return NextResponse.json({ result: data });

  } catch (error: unknown) {
    console.error("Gemini API call failed, falling back to templates:", error);
    try {
      const body = await req.clone().json();
      return handleFallback(body.tool, body.input);
    } catch {
      return NextResponse.json(
        { error: "Generation failed and fallback recovery errored." },
        { status: 500 }
      );
    }
  }
}

function handleFallback(tool: string, input: Record<string, string>) {
  // Track fallback statistics in Redis
  if (redis) {
    const keyMap: Record<string, string> = {
      bio: "bio",
      hooks: "hook",
      captions: "caption"
    };
    const key = keyMap[tool] || tool;
    redis.incr(`stats:${key}`).catch((err) => console.error("Redis fallback incr error:", err));
  }

  if (tool === "bio") {
    const data = generateBio({
      profession: input.profession || "",
      interests: input.interests || "",
      personality: input.personality || "",
      targetAudience: input.targetAudience || "",
      style: input.style || "Professional",
    });
    return NextResponse.json({ result: data });
  } else if (tool === "hooks") {
    const data = generateHooks({
      topic: input.topic || "",
      audience: input.audience || "",
      platform: input.platform || "",
    });
    return NextResponse.json({ result: data });
  } else if (tool === "captions") {
    const data = generateCaption({
      topic: input.topic || "",
      tone: input.tone || "",
      platform: input.platform || "",
    });
    return NextResponse.json({ result: data });
  }
  return NextResponse.json(
    { error: `Unsupported tool '${tool}'` },
    { status: 400 }
  );
}
