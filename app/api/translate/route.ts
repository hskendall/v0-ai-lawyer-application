import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { text, targetLanguage } = await request.json()

    if (!text || !targetLanguage) {
      return Response.json({ error: "Missing text or target language" }, { status: 400 })
    }

    const { text: translatedText } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `Translate the following text to ${targetLanguage === "zh" ? "Simplified Chinese (Mandarin)" : "English"}. Only return the translation, no explanations:

${text}`,
    })

    return Response.json({ translatedText })
  } catch (error) {
    console.error("Translation error:", error)
    return Response.json({ error: "Translation failed" }, { status: 500 })
  }
}
