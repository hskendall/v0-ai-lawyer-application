import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, FileText, Search, MessageSquare, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">AILawyer</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              Powered by Advanced AI Technology
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
              Your AI-Powered <span className="text-primary">Legal Assistant</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto leading-relaxed">
              Get instant legal guidance, analyze documents, and conduct research with our advanced AI lawyer.
              Professional legal assistance available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/chat">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Watch Demo
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Link href="/chat">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-transparent">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <span className="font-medium">AI Chat</span>
                  </div>
                </Card>
              </Link>
              <Link href="/documents">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-transparent">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="font-medium">Document Analysis</span>
                  </div>
                </Card>
              </Link>
              <Link href="/research">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-transparent">
                  <div className="flex items-center gap-3">
                    <Search className="h-6 w-6 text-primary" />
                    <span className="font-medium">Legal Research</span>
                  </div>
                </Card>
              </Link>
              <div className="mt-6 max-w-md mx-auto">
                <Link href="/agents">
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-3 justify-center">
                      <Users className="h-6 w-6 text-primary" />
                      <span className="font-medium text-primary">AI Legal Agents</span>
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8">TRUSTED BY LEGAL PROFESSIONALS AT</p>
          <div className="flex items-center justify-center gap-8 md:gap-12 opacity-60">
            <div className="text-lg font-semibold">BigLaw Firm</div>
            <div className="text-lg font-semibold">Legal Corp</div>
            <div className="text-lg font-semibold">Justice Partners</div>
            <div className="text-lg font-semibold">Law Associates</div>
            <div className="text-lg font-semibold">Legal Solutions</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Comprehensive Legal AI Tools</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need for modern legal practice, powered by cutting-edge artificial intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">AI Legal Chat</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Get instant answers to legal questions with our advanced AI assistant trained on comprehensive legal
                  databases.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Document Analysis</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Upload contracts, agreements, and legal documents for instant AI-powered analysis and insights.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Legal Research</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Access comprehensive legal research tools with case law, statutes, and regulatory information.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Secure & Confidential</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Bank-level security with end-to-end encryption ensures your legal matters remain completely
                  confidential.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Instant Results</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Get immediate legal insights and analysis, saving hours of research time with AI-powered efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Expert Support</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Access to qualified legal professionals for complex matters that require human expertise and judgment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Transform Your Legal Practice?</h2>
          <p className="text-xl opacity-90 mb-8 text-pretty">
            Join thousands of legal professionals who trust AILawyer for their daily legal needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">AILawyer</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Professional AI-powered legal assistance for the modern legal practice.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Compliance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Ethics
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 AILawyer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
