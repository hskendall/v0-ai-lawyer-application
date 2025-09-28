"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Scale, FileText, Search, Shield, Building, Gavel, Users } from "lucide-react"
import Link from "next/link"

const agentTypes = [
  {
    id: "swarm",
    name: "Full Legal Swarm",
    description: "Coordinated analysis from all specialized agents",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "contract",
    name: "Contract Analyzer",
    description: "Specialized in contract review and analysis",
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "research",
    name: "Legal Researcher",
    description: "Expert in case law and legal precedents",
    icon: Search,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "compliance",
    name: "Compliance Specialist",
    description: "Regulatory compliance and risk assessment",
    icon: Shield,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "litigation",
    name: "Litigation Support",
    description: "Case strategy and litigation assistance",
    icon: Gavel,
    color: "bg-red-100 text-red-700",
  },
  {
    id: "corporate",
    name: "Corporate Counsel",
    description: "Corporate governance and business law",
    icon: Building,
    color: "bg-purple-100 text-purple-700",
  },
]

export default function AgentsPage() {
  const [task, setTask] = useState("")
  const [selectedAgent, setSelectedAgent] = useState("swarm")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task.trim()) return

    setIsLoading(true)
    setResult("")

    try {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task.trim(),
          agentType: selectedAgent,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process request")
      }

      setResult(data.result)
    } catch (error) {
      console.error("Error:", error)
      setResult(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedAgentInfo = agentTypes.find((agent) => agent.id === selectedAgent)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">AILawyer</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/chat">
                <Button variant="outline" size="sm">
                  Chat
                </Button>
              </Link>
              <Link href="/documents">
                <Button variant="outline" size="sm">
                  Documents
                </Button>
              </Link>
              <Link href="/research">
                <Button variant="outline" size="sm">
                  Research
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Legal Assistant <span className="text-primary">Agents</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Specialized AI agents powered by Swarms framework for comprehensive legal analysis and support.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Agent Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Available Agents</CardTitle>
                <CardDescription>
                  Choose a specialized agent or use the full swarm for comprehensive analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agentTypes.map((agent) => {
                  const Icon = agent.icon
                  return (
                    <div
                      key={agent.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedAgent === agent.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedAgent(agent.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${agent.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm">{agent.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{agent.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Task Input and Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedAgentInfo && (
                    <>
                      <selectedAgentInfo.icon className="h-5 w-5" />
                      {selectedAgentInfo.name}
                    </>
                  )}
                </CardTitle>
                <CardDescription>Describe your legal task or question for specialized AI analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Enter your legal question or task here... (e.g., 'Analyze the key risks in a software licensing agreement for a SaaS company')"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex items-center gap-4">
                    <Button type="submit" disabled={!task.trim() || isLoading} className="flex-1">
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Analyze with AI Agents"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            {(result || isLoading) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Analysis Results
                    {selectedAgentInfo && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedAgentInfo.name}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                        <p className="text-muted-foreground">AI agents are analyzing your request...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto">{result}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Swarms Framework Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Multi-Agent Coordination</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Multiple specialized agents work together to provide comprehensive legal analysis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Production-Ready</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Enterprise-grade framework with robust error handling and reliability
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Specialized Expertise</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Each agent is trained for specific legal domains and use cases
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
