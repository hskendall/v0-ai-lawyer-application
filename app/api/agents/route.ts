import { type NextRequest, NextResponse } from "next/server"
import { spawn } from "child_process"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const { task, agentType = "swarm" } = await req.json()

    if (!task) {
      return NextResponse.json({ error: "Task is required" }, { status: 400 })
    }

    // Run the Python script with the legal swarm
    const pythonScript = path.join(process.cwd(), "scripts", "legal_agents_swarm.py")

    return new Promise((resolve) => {
      const python = spawn("python3", [
        "-c",
        `
import sys
sys.path.append('${path.join(process.cwd(), "scripts")}')
from legal_agents_swarm import run_legal_swarm
result = run_legal_swarm("${task.replace(/"/g, '\\"')}", "${agentType}")
print(result)
`,
      ])

      let output = ""
      let error = ""

      python.stdout.on("data", (data) => {
        output += data.toString()
      })

      python.stderr.on("data", (data) => {
        error += data.toString()
      })

      python.on("close", (code) => {
        if (code !== 0) {
          resolve(
            NextResponse.json(
              {
                error: "Failed to run legal agents",
                details: error,
              },
              { status: 500 },
            ),
          )
        } else {
          resolve(
            NextResponse.json({
              result: output.trim(),
              agentType,
              task,
            }),
          )
        }
      })
    })
  } catch (error) {
    console.error("Error in agents API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
