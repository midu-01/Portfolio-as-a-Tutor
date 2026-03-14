import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getPortfolioAssistantContext } from "@/lib/portfolio-assistant";

export const dynamic = "force-dynamic";

const assistantRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(4000)
      })
    )
    .min(1)
    .max(12)
});

const assistantApiKey = (process.env.GROQ_API_KEY ?? process.env.OPENAI_API_KEY)?.trim();
const assistantModel =
  (process.env.GROQ_MODEL ?? process.env.OPENAI_MODEL ?? "openai/gpt-oss-120b").trim();
const isGroq = Boolean(process.env.GROQ_API_KEY?.trim());

const openai = assistantApiKey
  ? new OpenAI({
      apiKey: assistantApiKey,
      baseURL: process.env.GROQ_API_KEY
        ? process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1"
        : undefined
    })
  : null;

export async function POST(request: Request) {
  if (!openai) {
    return NextResponse.json(
      {
        message:
          "The AI assistant is not configured yet. Please add GROQ_API_KEY or OPENAI_API_KEY to enable it."
      },
      { status: 503 }
    );
  }

  try {
    const json = await request.json();
    const data = assistantRequestSchema.parse(json);
    const context = await getPortfolioAssistantContext();

    const response = await openai.responses.create({
      model: assistantModel,
      ...(isGroq ? {} : { reasoning: { effort: "low" as const } }),
      max_output_tokens: 320,
      instructions: [
        "You are the AI assistant for Midu's Coaching, a premium tutor portfolio for Midu Mojumder.",
        "Answer using only the portfolio context provided to you.",
        "If the answer is not available in the portfolio context, say you do not see that information on the portfolio and invite the visitor to send an inquiry.",
        "Be warm, concise, trustworthy, and conversion-friendly.",
        "When helpful, encourage the visitor to contact Midu for guardian or student inquiries.",
        "If the visitor writes in Bangla, reply in Bangla.",
        `Portfolio context:\n${context}`
      ].join("\n\n"),
      input: data.messages.map((message) => ({
        role: message.role,
        content: message.content
      }))
    });

    const answer =
      response.output_text?.trim() ||
      "I could not generate a reply just now. Please try again or send an inquiry.";

    return NextResponse.json({ message: answer });
  } catch (error) {
    console.error("Assistant route error", error);

    return NextResponse.json(
      {
        message:
          "The assistant ran into a problem. Please try again in a moment or use the contact form."
      },
      { status: 500 }
    );
  }
}
