"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, Upload, FileText, AlertTriangle, CheckCircle, Clock, Download, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { useDropzone } from "react-dropzone"

interface AnalysisResult {
  id: string
  fileName: string
  fileSize: string
  uploadDate: Date
  status: "analyzing" | "completed" | "error"
  progress: number
  analysis?: {
    documentType: string
    keyFindings: string[]
    riskAssessment: "low" | "medium" | "high"
    recommendations: string[]
    summary: string
  }
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<AnalysisResult[]>([
    {
      id: "1",
      fileName: "employment-contract.pdf",
      fileSize: "2.4 MB",
      uploadDate: new Date("2024-01-15"),
      status: "completed",
      progress: 100,
      analysis: {
        documentType: "Employment Contract",
        keyFindings: [
          "Non-compete clause present with 2-year restriction",
          "Intellectual property assignment clause included",
          "At-will employment terms specified",
          "Confidentiality agreement embedded",
        ],
        riskAssessment: "medium",
        recommendations: [
          "Review non-compete clause for enforceability in your jurisdiction",
          "Consider negotiating the IP assignment scope",
          "Ensure termination procedures comply with local labor laws",
        ],
        summary:
          "This employment contract contains standard provisions with some areas requiring attention. The non-compete clause may be overly broad, and the IP assignment terms should be carefully reviewed.",
      },
    },
    {
      id: "2",
      fileName: "lease-agreement.pdf",
      fileSize: "1.8 MB",
      uploadDate: new Date("2024-01-14"),
      status: "analyzing",
      progress: 65,
    },
  ])

  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsUploading(true)

    acceptedFiles.forEach((file) => {
      const newDoc: AnalysisResult = {
        id: Date.now().toString(),
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date(),
        status: "analyzing",
        progress: 0,
      }

      setDocuments((prev) => [...prev, newDoc])

      // Simulate analysis progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setDocuments((prev) =>
            prev.map((doc) =>
              doc.id === newDoc.id
                ? {
                    ...doc,
                    status: "completed",
                    progress: 100,
                    analysis: {
                      documentType: "Legal Document",
                      keyFindings: ["Document successfully analyzed", "Standard legal provisions identified"],
                      riskAssessment: "low",
                      recommendations: ["Review with legal counsel if needed"],
                      summary: "Document analysis completed successfully.",
                    },
                  }
                : doc,
            ),
          )
          setIsUploading(false)
        } else {
          setDocuments((prev) => prev.map((doc) => (doc.id === newDoc.id ? { ...doc, progress } : doc)))
        }
      }, 500)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const getRiskColor = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20"
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20"
      case "high":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20"
    }
  }

  const getStatusIcon = (status: AnalysisResult["status"]) => {
    switch (status) {
      case "analyzing":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

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
              <Badge variant="secondary">
                <FileText className="h-3 w-3 mr-1" />
                Document Analysis
              </Badge>
              <Link href="/chat">
                <Button variant="outline" size="sm">
                  AI Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Document Analysis</h1>
            <p className="text-muted-foreground">
              Upload legal documents for AI-powered analysis, risk assessment, and recommendations.
            </p>
          </div>

          {/* Upload Area */}
          <Card>
            <CardContent className="p-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary hover:bg-primary/5"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {isDragActive ? "Drop files here" : "Upload Legal Documents"}
                </h3>
                <p className="text-muted-foreground mb-4">Drag and drop files here, or click to select files</p>
                <p className="text-sm text-muted-foreground">Supports PDF, DOC, DOCX files up to 10MB</p>
                <Button className="mt-4" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Select Files"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documents List */}
          <div className="grid gap-6">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(doc.status)}
                      <div>
                        <CardTitle className="text-lg">{doc.fileName}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {doc.fileSize} • Uploaded {doc.uploadDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === "analyzing" && (
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          Analyzing
                        </Badge>
                      )}
                      {doc.status === "completed" && doc.analysis && (
                        <Badge className={getRiskColor(doc.analysis.riskAssessment)}>
                          {doc.analysis.riskAssessment.toUpperCase()} RISK
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {doc.status === "analyzing" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Analysis Progress</span>
                        <span>{Math.round(doc.progress)}%</span>
                      </div>
                      <Progress value={doc.progress} className="w-full" />
                    </div>
                  )}

                  {doc.status === "completed" && doc.analysis && (
                    <Tabs defaultValue="summary" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="findings">Key Findings</TabsTrigger>
                        <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
                        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                      </TabsList>

                      <TabsContent value="summary" className="mt-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Document Type</h4>
                            <Badge variant="outline">{doc.analysis.documentType}</Badge>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Analysis Summary</h4>
                            <p className="text-muted-foreground leading-relaxed">{doc.analysis.summary}</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="findings" className="mt-4">
                        <div>
                          <h4 className="font-semibold mb-3">Key Findings</h4>
                          <ul className="space-y-2">
                            {doc.analysis.keyFindings.map((finding, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>

                      <TabsContent value="risks" className="mt-4">
                        <div>
                          <h4 className="font-semibold mb-3">Risk Assessment</h4>
                          <div className="flex items-center gap-2 mb-4">
                            <Badge className={getRiskColor(doc.analysis.riskAssessment)}>
                              {doc.analysis.riskAssessment.toUpperCase()} RISK
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            This document has been assessed as {doc.analysis.riskAssessment} risk based on the
                            identified clauses and potential legal implications.
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="recommendations" className="mt-4">
                        <div>
                          <h4 className="font-semibold mb-3">Recommendations</h4>
                          <ul className="space-y-2">
                            {doc.analysis.recommendations.map((recommendation, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{recommendation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {documents.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Documents Yet</h3>
                <p className="text-muted-foreground">
                  Upload your first legal document to get started with AI-powered analysis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
