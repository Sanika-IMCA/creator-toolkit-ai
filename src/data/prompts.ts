export interface BioInput {
  profession: string;
  interests: string;
  personality: string;
  targetAudience: string;
}

export interface BioOutput {
  instagramBio: string;
  linkedInHeadline: string;
  collaborationLine: string;
}

export interface HookInput {
  topic: string;
  audience: string;
  platform: string;
}

export interface HookOutput {
  hooks: string[];
}

export interface CaptionInput {
  topic: string;
  tone: string;
  platform: string;
}

export interface CaptionOutput {
  storyStyle: string;
  authorityStyle: string;
  funnyStyle: string;
}

// Utility to get context-appropriate emojis
export function getEmoji(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("doc") || t.includes("med") || t.includes("health") || t.includes("nurse") || t.includes("skin")) return "🩺";
  if (t.includes("tech") || t.includes("dev") || t.includes("code") || t.includes("software") || t.includes("engineer")) return "💻";
  if (t.includes("art") || t.includes("design") || t.includes("paint") || t.includes("draw")) return "🎨";
  if (t.includes("fit") || t.includes("gym") || t.includes("coach") || t.includes("sport") || t.includes("train")) return "💪";
  if (t.includes("travel") || t.includes("explore") || t.includes("globe") || t.includes("nomad")) return "✈️";
  if (t.includes("beauty") || t.includes("makeup") || t.includes("skincare") || t.includes("fashion") || t.includes("style")) return "💄";
  if (t.includes("food") || t.includes("chef") || t.includes("cook") || t.includes("bake")) return "🍳";
  if (t.includes("photograph") || t.includes("video") || t.includes("camera")) return "📷";
  if (t.includes("music") || t.includes("sing") || t.includes("song") || t.includes("dance")) return "🎵";
  if (t.includes("writ") || t.includes("read") || t.includes("book") || t.includes("poem")) return "✍️";
  if (t.includes("money") || t.includes("finance") || t.includes("business") || t.includes("founder") || t.includes("entrepreneur")) return "💼";
  return "✨";
}

export function generateBio(input: BioInput): BioOutput {
  const { profession, interests, personality, targetAudience } = input;
  const profEmoji = getEmoji(profession);
  const interestList = interests.split(',').map(i => i.trim()).filter(Boolean);
  const primaryInterest = interestList[0] || "lifestyle";
  const secInterest = interestList[1] || "creating";
  const intEmoji1 = getEmoji(primaryInterest);

  const pers = personality.toLowerCase();
  const aud = targetAudience || "everyone";

  let instagramBio = "";
  let linkedInHeadline = "";
  let collaborationLine = "";

  if (pers.includes("fun") || pers.includes("wit") || pers.includes("humor") || pers.includes("silly")) {
    instagramBio = `${profEmoji} ${profession} by day, ${intEmoji1} ${primaryInterest} lover by night!\n😜 Keeping it 100% ${personality} & relatable.\n🚀 Sharing daily tips for ${aud}!\n👇 Let's do this: linktr.ee/creator`;
    linkedInHeadline = `${profession} & Content Creator | Fueling my passion for ${primaryInterest} & ${secInterest} | Serving up ${personality} content for ${aud}`;
    collaborationLine = `💌 Collabs (PR/Brands): Open to fun and engaging campaigns focused on ${aud}! Let's create magic: collab@creator.ai`;
  } else if (pers.includes("bold") || pers.includes("energetic") || pers.includes("fearless")) {
    instagramBio = `${profEmoji} ${profession} | Breaking boundaries in ${primaryInterest}!\n⚡️ Unapologetically ${personality}.\n🔥 Empowering ${aud} to take action.\n👇 Claim your free guide here!`;
    linkedInHeadline = `${profession} | Keynote Speaker & Creator | Empowering ${aud} through ${primaryInterest} & ${personality} strategies`;
    collaborationLine = `⚡️ Let's build something epic! Open to high-impact sponsorships, speaking gigs, and brand partnerships targeting ${aud}. Contact: partnerships@creator.ai`;
  } else if (pers.includes("professional") || pers.includes("corporate") || pers.includes("serio")) {
    instagramBio = `${profEmoji} Certified ${profession}\n📈 Specializing in ${primaryInterest} & ${secInterest}.\n🎯 Driving real results for ${aud}.\n💼 Tap below to check my portfolio.`;
    linkedInHeadline = `${profession} | Expert in ${primaryInterest} | Dedicated to delivering high-value insights for ${aud} | Speaker & Consultant`;
    collaborationLine = `💼 Open to strategic partnerships, advisory roles, and professional collaborations that add genuine value to ${aud}. Inquiries: business@creator.ai`;
  } else {
    // Default / Creative / Aesthetic
    instagramBio = `${profEmoji} ${profession} | Exploring the art of ${primaryInterest} ${intEmoji1}\n🌸 Curating ${personality} aesthetics & storytelling.\n💫 Helping ${aud} find their spark.\n👇 Join the community below!`;
    linkedInHeadline = `${profession} | Creative & Strategist | Blending ${primaryInterest} with ${personality} storytelling to inspire ${aud}`;
    collaborationLine = `✨ Let's co-create! Open to aesthetic brand collaborations, guest content, and projects targeting ${aud}. Say hello: hello@creator.ai`;
  }

  return { instagramBio, linkedInHeadline, collaborationLine };
}

export function generateHooks(input: HookInput): HookOutput {
  const { topic, audience, platform } = input;
  const p = platform || "social media";
  const a = audience || "your followers";
  const t = topic || "creating content";

  const isSkincare = t.toLowerCase().includes("skin");

  const hooks = [
    isSkincare 
      ? `I wish someone told me this before buying skincare... 🧴`
      : `I wish someone told me this before starting with ${t}...`,
    isSkincare
      ? `This one mistake ruined my skin... 😳`
      : `This one mistake completely ruined my ${t}...`,
    `Attention ${a}: Stop scrolling if you want to master ${t}!`,
    `The #1 tool experts use for ${t} that feels illegal to know.`,
    `🤫 Why does nobody talk about this major secret with ${t}?`,
    `⚠️ Stop scrolling if you want to level up your ${t} before 2026.`,
    `⏳ This 10-second habit for ${t} will save you 100+ hours.`,
    `💡 Here is my exact 3-step blueprint to automate your ${t} starting today.`,
    `😳 Unpopular opinion: ${t} is actually the worst way to grow your brand.`,
    `🔥 The ultimate cheat sheet for ${t} that you'll want to bookmark immediately.`
  ];

  // Adjust hooks style to platform
  const finalHooks = hooks.map((hook) => {
    const plat = p.toLowerCase();
    const prefix = plat.includes("tiktok") || plat.includes("reels") || plat.includes("shorts")
      ? "🎥 "
      : plat.includes("twitter") || plat.includes("x")
      ? "🧵 "
      : plat.includes("linkedin")
      ? "💼 "
      : "✨ ";
    return `${prefix}${hook}`;
  });

  return { hooks: finalHooks };
}

export function generateCaption(input: CaptionInput): CaptionOutput {
  const { topic, tone, platform } = input;
  const t = topic || "your latest project";
  const tn = tone || "energetic";
  const plat = platform || "Instagram";

  const hashtagBase = t.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).slice(0, 3).filter(Boolean).map(w => `#${w}`).join(" ");
  const generalHashtags = `#contentcreator #creators #growthmindset #creatortoolkit`;

  const storyStyle = `📖 STORY STYLE (Tailored for ${plat} in a ${tn} tone):\nI still remember when I first started working on ${t}. It was late, my hands were shaking, and I had no idea if it would work. Fast forward to today, and the results speak for themselves. The journey isn't easy, but taking that first step changes everything. ✨\n\nWhat was your starting point? Let me know below! 👇\n\n${hashtagBase} ${generalHashtags} #storytelling`;

  const authorityStyle = `💡 AUTHORITY STYLE (Tailored for ${plat} in a ${tn} tone):\nLet's cut through the noise about ${t}. If you want real growth, you need a system. Here is the exact blueprint I use:\n- Step 1: Define your core goals.\n- Step 2: Implement automated tracking.\n- Step 3: Iterate based on analytics.\n\nOptimizing your approach isn't optional – it's the baseline. Save this post to refer back to it! 📌\n\n${hashtagBase} ${generalHashtags} #value #learn`;

  const funnyStyle = `🙃 FUNNY STYLE (Tailored for ${plat} in a ${tn} tone):\nMy last two brain cells trying to figure out ${t} at 2 AM. ☕️\nIf you're looking for a sign to stop overthinking and just publish, this is it. Or don't, and let me keep all the views. Your choice. 🍿😎\n\nShare this with a creator who's currently overthinking their posts. ✈️\n\n${hashtagBase} ${generalHashtags} #creatorproblems #lol`;

  return { storyStyle, authorityStyle, funnyStyle };
}
