"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scale, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">AILawyer</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-bold mb-2">Check Your Email</h2>
              <p className="text-muted-foreground mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="space-y-2">
                <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
                  Try Different Email
                </Button>
                <Link href="/auth/login">
                  <Button className="w-full">Back to Sign In</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Scale className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">AILawyer</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
          <p className="text-muted-foreground">Enter your email address and we'll send you a reset link</p>
        </div>

        {/* Reset Form */}
        <Card>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
