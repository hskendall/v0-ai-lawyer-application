"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Scale, Send, User, Bot, FileText, AlertCircle, Sparkles, Languages, Globe } from "lucide-react"
import Link from "next/link"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

interface Message {
  id: string
  role: "user" | "assistant"
  parts: { type: string; text: string }[]
}

interface ExtendedMessage extends Message {
  originalText?: string
  translatedText?: string
  isTranslated?: boolean
}

const suggestedQuestions = [
  "What are the key elements of a valid contract?",
  "How do I protect my intellectual property?",
  "What should I know about employment law compliance?",
  "Can you explain the difference between civil and criminal law?",
]

const suggestedQuestionsChinese = [
  "有效合同的关键要素是什么？",
  "我如何保护我的知识产权？",
  "关于就业法合规我应该了解什么？",
  "你能解释民法和刑法的区别吗？",
]

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "zh">("en")
  const [translatedMessages, setTranslatedMessages] = useState<Map<string, ExtendedMessage>>(new Map())
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const translateText = async (text: string, targetLanguage: "en" | "zh") => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage }),
      })

      if (!response.ok) throw new Error("Translation failed")

      const { translatedText } = await response.json()
      return translatedText
    } catch (error) {
      console.error("Translation error:", error)
      return text // Return original text if translation fails
    }
  }

  const toggleLanguage = async () => {
    const newLanguage = currentLanguage === "en" ? "zh" : "en"
    setCurrentLanguage(newLanguage)
    setIsTranslating(true)

    // Translate all existing messages
    const newTranslatedMessages = new Map(translatedMessages)

    for (const message of messages) {
      const messageText = message.parts.find((part) => part.type === "text")?.text || ""
      if (messageText && !newTranslatedMessages.has(message.id)) {
        const translatedText = await translateText(messageText, newLanguage)
        newTranslatedMessages.set(message.id, {
          ...message,
          originalText: messageText,
          translatedText,
          isTranslated: true,
        })
      }
    }

    setTranslatedMessages(newTranslatedMessages)
    setIsTranslating(false)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage({ text: input })
      setInput("")
    }
  }

  const isLoading = status === "in_progress"

  const getDisplayText = (message: Message) => {
    if (currentLanguage === "en") {
      return message.parts.find((part) => part.type === "text")?.text || ""
    }

    const translatedMessage = translatedMessages.get(message.id)
    if (translatedMessage?.translatedText) {
      return translatedMessage.translatedText
    }

    return message.parts.find((part) => part.type === "text")?.text || ""
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
              <Badge variant="secondary" className="hidden sm:flex">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Legal Assistant
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                disabled={isTranslating}
                className="flex items-center gap-2 bg-transparent"
              >
                <Languages className="h-4 w-4" />
                {currentLanguage === "en" ? "中文" : "English"}
              </Button>
              <Button variant="outline" size="sm">
                New Chat
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {currentLanguage === "en" ? "AI Legal Consultation" : "AI法律咨询"}
            </h1>
            <p className="text-muted-foreground">
              {currentLanguage === "en"
                ? "Get instant legal guidance from our AI assistant. Ask questions about contracts, compliance, and more."
                : "从我们的AI助手获得即时法律指导。询问有关合同、合规等问题。"}
            </p>
          </div>

          {/* Disclaimer */}
          <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                    {currentLanguage === "en" ? "Important Legal Disclaimer" : "重要法律免责声明"}
                  </p>
                  <p className="text-amber-700 dark:text-amber-300">
                    {currentLanguage === "en"
                      ? "This AI assistant provides general legal information only and does not constitute legal advice. Always consult with a qualified attorney for specific legal matters."
                      : "此AI助手仅提供一般法律信息，不构成法律建议。对于具体法律事务，请务必咨询合格的律师。"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                {currentLanguage === "en" ? "Legal AI Assistant" : "法律AI助手"}
                {isTranslating && (
                  <Badge variant="secondary" className="ml-auto">
                    <Globe className="h-3 w-3 mr-1 animate-spin" />
                    {currentLanguage === "en" ? "Translating..." : "翻译中..."}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <ScrollArea className="h-[500px] px-6" ref={scrollAreaRef}>
                <div className="space-y-4 py-4">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {currentLanguage === "en" ? "Welcome to AI Legal Assistant" : "欢迎使用AI法律助手"}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {currentLanguage === "en"
                          ? "Ask me any legal question to get started. I can help with contracts, compliance, and general legal guidance."
                          : "向我提出任何法律问题开始。我可以帮助处理合同、合规和一般法律指导。"}
                      </p>
                      <div className="grid gap-2 max-w-md mx-auto">
                        {(currentLanguage === "en" ? suggestedQuestions : suggestedQuestionsChinese).map(
                          (question, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-left justify-start h-auto p-3 text-wrap bg-transparent"
                              onClick={() => handleSuggestedQuestion(question)}
                            >
                              {question}
                            </Button>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 bg-primary">
                          <AvatarFallback>
                            <Bot className="h-4 w-4 text-primary-foreground" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{getDisplayText(message)}</p>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 bg-secondary">
                          <AvatarFallback>
                            <User className="h-4 w-4 text-secondary-foreground" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="h-8 w-8 bg-primary">
                        <AvatarFallback>
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted text-muted-foreground rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.1s]" />
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                          </div>
                          <span className="text-sm">
                            {currentLanguage === "en" ? "AI is thinking..." : "AI正在思考..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t border-border p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={currentLanguage === "en" ? "Ask a legal question..." : "提出法律问题..."}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{currentLanguage === "en" ? "Document Analysis" : "文档分析"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === "en" ? "Upload and analyze legal documents" : "上传并分析法律文档"}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <Scale className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{currentLanguage === "en" ? "Legal Research" : "法律研究"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === "en" ? "Search case law and statutes" : "搜索判例法和法规"}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{currentLanguage === "en" ? "Expert Consultation" : "专家咨询"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === "en" ? "Connect with legal professionals" : "联系法律专业人士"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
