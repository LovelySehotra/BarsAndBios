import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Upload } from "lucide-react";
import { useState } from "react";

const SubmitReview = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
              Submit Your Review
            </h1>
            <p className="text-foreground/80 text-lg">
              Share your thoughts on the latest hip-hop releases
            </p>
          </div>

          <Card className="bg-dark-card border-border p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="album-title">Album Title *</Label>
                  <Input 
                    id="album-title" 
                    placeholder="Enter album title"
                    className="bg-dark-bg border-border focus:border-gold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="artist-name">Artist Name *</Label>
                  <Input 
                    id="artist-name" 
                    placeholder="Enter artist name"
                    className="bg-dark-bg border-border focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select>
                    <SelectTrigger className="bg-dark-bg border-border focus:border-gold">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hip-hop">Hip Hop</SelectItem>
                      <SelectItem value="trap">Trap</SelectItem>
                      <SelectItem value="old-school">Old School</SelectItem>
                      <SelectItem value="drill">Drill</SelectItem>
                      <SelectItem value="conscious">Conscious Rap</SelectItem>
                      <SelectItem value="experimental">Experimental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="release-year">Release Year</Label>
                  <Input 
                    id="release-year" 
                    type="number" 
                    placeholder="2024"
                    className="bg-dark-bg border-border focus:border-gold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rating *</Label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                      className="transition-colors"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= (hoveredRating || rating)
                            ? "text-gold fill-gold"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-4 text-sm text-muted-foreground">
                    {rating > 0 && `${rating}/10`}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-title">Review Title *</Label>
                <Input 
                  id="review-title" 
                  placeholder="Give your review a catchy title"
                  className="bg-dark-bg border-border focus:border-gold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-content">Review Content *</Label>
                <Textarea 
                  id="review-content"
                  placeholder="Share your detailed thoughts about the album..."
                  className="bg-dark-bg border-border focus:border-gold min-h-[200px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviewer-name">Your Name</Label>
                <Input 
                  id="reviewer-name" 
                  placeholder="Your name or handle"
                  className="bg-dark-bg border-border focus:border-gold"
                />
              </div>

              <div className="space-y-2">
                <Label>Album Artwork (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop an image, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1" variant="hero">
                  Submit Review
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

export default SubmitReview;