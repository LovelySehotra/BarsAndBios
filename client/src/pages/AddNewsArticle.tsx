import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText } from "lucide-react";

const AddNewsArticle = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
              Submit News Article
            </h1>
            <p className="text-foreground/80 text-lg">
              Share the latest hip-hop news and updates with our community
            </p>
          </div>

          <Card className="bg-dark-card border-border p-8">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="article-title">Article Title *</Label>
                <Input 
                  id="article-title" 
                  placeholder="Enter compelling headline"
                  className="bg-dark-bg border-border focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select>
                    <SelectTrigger className="bg-dark-bg border-border focus:border-gold">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breaking-news">Breaking News</SelectItem>
                      <SelectItem value="industry-news">Industry News</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="culture">Culture</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="interviews">Interviews</SelectItem>
                      <SelectItem value="album-releases">Album Releases</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="read-time">Estimated Read Time (minutes)</Label>
                  <Input 
                    id="read-time" 
                    type="number" 
                    placeholder="5"
                    min="1"
                    max="30"
                    className="bg-dark-bg border-border focus:border-gold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Article Excerpt *</Label>
                <Textarea 
                  id="excerpt"
                  placeholder="Brief summary of the article (160 characters max)"
                  className="bg-dark-bg border-border focus:border-gold"
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">
                  This will be shown in article previews and search results
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="article-content">Article Content *</Label>
                <Textarea 
                  id="article-content"
                  placeholder="Write your full article here..."
                  className="bg-dark-bg border-border focus:border-gold min-h-[300px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author-name">Author Name *</Label>
                  <Input 
                    id="author-name" 
                    placeholder="Your name or pen name"
                    className="bg-dark-bg border-border focus:border-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (Optional)</Label>
                  <Input 
                    id="tags" 
                    placeholder="rap, hip-hop, drake, kendrick"
                    className="bg-dark-bg border-border focus:border-gold"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate tags with commas
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Featured Image (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
                  <FileText className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Upload a featured image for your article
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG up to 5MB (recommended: 1200x630px)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-links">Source Links (Optional)</Label>
                <Textarea 
                  id="source-links"
                  placeholder="Add any source links or references (one per line)"
                  className="bg-dark-bg border-border focus:border-gold"
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1" variant="hero">
                  Publish Article
                </Button>
                <Button type="button" variant="outline" className="px-8">
                  Save Draft
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddNewsArticle;