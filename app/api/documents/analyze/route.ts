import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const analysisSchema = z.object({
  documentType: z.string().describe("The type of legal document (e.g., Contract, Agreement, etc.)"),
  keyFindings: z.array(z.string()).describe("Important clauses, terms, or provisions found in the document"),
  riskAssessment: z.enum(["low", "medium", "high"]).describe("Overall risk level of the document"),
  recommendations: z.array(z.string()).describe("Actionable recommendations for the document"),
  summary: z.string().describe("A comprehensive summary of the document analysis"),
})

export async function POST(req: Request) {
  try {
    const { documentText, fileName } = await req.json()

    if (!documentText) {
      return Response.json({ error: "Document text is required" }, { status: 400 })
    }

    const result = await generateObject({
      model: openai("gpt-4"),
      system: `You are an expert legal document analyzer. Analyze the provided legal document and provide:

1. Document Type: Identify what type of legal document this is
2. Key Findings: List the most important clauses, terms, and provisions
3. Risk Assessment: Evaluate the overall risk level (low/medium/high) based on:
   - Unusual or potentially problematic clauses
   - Missing standard protections
   - Ambiguous language
   - Potential legal issues
4. Recommendations: Provide specific, actionable recommendations
5. Summary: A comprehensive analysis summary

Be thorough, professional, and focus on practical legal insights. Always remind that this is general analysis and specific legal advice should come from a qualified attorney.`,
      prompt: `Analyze this legal document:

Filename: ${fileName}

Document Content:
${documentText}

Provide a comprehensive legal analysis.`,
      schema: analysisSchema,
    })

    return Response.json(result.object)
  } catch (error) {
    console.error("Document analysis error:", error)
    return Response.json({ error: "Failed to analyze document" }, { status: 500 })
  }
}
