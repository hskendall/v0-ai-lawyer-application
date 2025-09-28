"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Scale,
  Search,
  Filter,
  BookOpen,
  Gavel,
  FileText,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
  Clock,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  type: "case" | "statute" | "regulation" | "article"
  jurisdiction: string
  date: string
  court?: string
  citation: string
  summary: string
  relevanceScore: number
  tags: string[]
  url: string
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Smith v. Johnson Industries",
    type: "case",
    jurisdiction: "Federal",
    date: "2023-08-15",
    court: "9th Circuit Court of Appeals",
    citation: "2023 WL 1234567",
    summary:
      "Landmark employment law case establishing new precedent for remote work discrimination claims. Court held that employers cannot discriminate based on employee location preferences.",
    relevanceScore: 95,
    tags: ["Employment Law", "Discrimination", "Remote Work"],
    url: "#",
  },
  {
    id: "2",
    title: "California Labor Code Section 2802",
    type: "statute",
    jurisdiction: "California",
    date: "2023-01-01",
    citation: "Cal. Lab. Code § 2802",
    summary:
      "Requires employers to reimburse employees for necessary business expenses incurred in the performance of their duties, including home office expenses for remote workers.",
    relevanceScore: 88,
    tags: ["Employment Law", "Reimbursement", "California"],
    url: "#",
  },
  {
    id: "3",
    title: "NLRB General Counsel Memo on Remote Work Rights",
    type: "regulation",
    jurisdiction: "Federal",
    date: "2023-06-20",
    citation: "NLRB GC 23-02",
    summary:
      "National Labor Relations Board guidance on employee rights regarding remote work arrangements and employer obligations under the National Labor Relations Act.",
    relevanceScore: 82,
    tags: ["Labor Relations", "Remote Work", "NLRB"],
    url: "#",
  },
  {
    id: "4",
    title: "The Future of Employment Law in a Remote World",
    type: "article",
    jurisdiction: "N/A",
    date: "2023-09-10",
    citation: "Harvard Law Review, Vol. 136, No. 8",
    summary:
      "Comprehensive analysis of emerging legal issues in remote work arrangements, including jurisdictional challenges and evolving employment standards.",
    relevanceScore: 76,
    tags: ["Employment Law", "Remote Work", "Legal Analysis"],
    url: "#",
  },
]

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    jurisdiction: "all",
    dateRange: "all",
  })
  const [savedSearches, setSavedSearches] = useState([
    "employment discrimination remote work",
    "contract breach damages",
    "intellectual property licensing",
  ])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSearchResults(mockResults)
    setIsSearching(false)
  }

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "case":
        return <Gavel className="h-4 w-4" />
      case "statute":
        return <BookOpen className="h-4 w-4" />
      case "regulation":
        return <FileText className="h-4 w-4" />
      case "article":
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "case":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "statute":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "regulation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "article":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
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
                <Search className="h-3 w-3 mr-1" />
                Legal Research
              </Badge>
              <Link href="/chat">
                <Button variant="outline" size="sm">
                  AI Chat
                </Button>
              </Link>
              <Link href="/documents">
                <Button variant="outline" size="sm">
                  Documents
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Research Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cases Searched</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Saved Results</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Recent Searches</span>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>

            {/* Saved Searches */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saved Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {savedSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-2 text-wrap bg-transparent"
                      onClick={() => setSearchQuery(search)}
                    >
                      <Clock className="h-3 w-3 mr-2 flex-shrink-0" />
                      {search}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["AI Regulation", "Remote Work Law", "Data Privacy", "Crypto Compliance"].map((topic, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Legal Research</h1>
              <p className="text-muted-foreground">
                Search through millions of cases, statutes, regulations, and legal articles.
              </p>
            </div>

            {/* Search Form */}
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search cases, statutes, regulations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isSearching}>
                      {isSearching ? "Searching..." : <Search className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-4">
                    <Select
                      value={filters.type}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="case">Cases</SelectItem>
                        <SelectItem value="statute">Statutes</SelectItem>
                        <SelectItem value="regulation">Regulations</SelectItem>
                        <SelectItem value="article">Articles</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.jurisdiction}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, jurisdiction: value }))}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Jurisdictions</SelectItem>
                        <SelectItem value="federal">Federal</SelectItem>
                        <SelectItem value="california">California</SelectItem>
                        <SelectItem value="new-york">New York</SelectItem>
                        <SelectItem value="texas">Texas</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.dateRange}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, dateRange: value }))}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Dates</SelectItem>
                        <SelectItem value="last-year">Last Year</SelectItem>
                        <SelectItem value="last-5-years">Last 5 Years</SelectItem>
                        <SelectItem value="last-10-years">Last 10 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Search Results ({searchResults.length})</h2>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={getTypeColor(result.type)}>
                                  {getTypeIcon(result.type)}
                                  <span className="ml-1 capitalize">{result.type}</span>
                                </Badge>
                                <Badge variant="outline">{result.relevanceScore}% match</Badge>
                              </div>
                              <h3 className="text-lg font-semibold text-primary hover:underline cursor-pointer">
                                {result.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{result.citation}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {result.jurisdiction}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(result.date).toLocaleDateString()}
                            </div>
                            {result.court && (
                              <div className="flex items-center gap-1">
                                <Gavel className="h-3 w-3" />
                                {result.court}
                              </div>
                            )}
                          </div>

                          {/* Summary */}
                          <p className="text-sm leading-relaxed">{result.summary}</p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {result.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 pt-2">
                            <Button size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Full Text
                            </Button>
                            <Button variant="outline" size="sm">
                              Cite
                            </Button>
                            <Button variant="outline" size="sm">
                              Save
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {searchResults.length === 0 && !isSearching && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Start Your Legal Research</h3>
                  <p className="text-muted-foreground mb-6">
                    Search through our comprehensive database of legal documents and precedents.
                  </p>
                  <div className="grid gap-2 max-w-md mx-auto">
                    {[
                      "employment discrimination cases",
                      "contract breach remedies",
                      "intellectual property statutes",
                      "corporate governance regulations",
                    ].map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-left justify-start bg-transparent"
                        onClick={() => setSearchQuery(example)}
                      >
                        {example}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
