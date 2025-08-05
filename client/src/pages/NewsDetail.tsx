import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, Heart } from "lucide-react";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API/database
  const article = {
    id: id,
    title: "Kendrick Lamar Announces Surprise Album Release Date",
    excerpt: "The Compton rapper drops hints about his upcoming project in a cryptic Instagram post, sending fans into a frenzy.",
    content: `
      <p>In a move that has sent shockwaves through the hip-hop community, Kendrick Lamar has finally broken his silence about his highly anticipated follow-up to 2022's "Mr. Morale & The Big Steppers."</p>
      
      <p>The cryptic Instagram post, featuring nothing more than a simple date and crown emoji, has fans speculating wildly about what's to come. Industry insiders suggest this could be the most significant hip-hop release of the year.</p>
      
      <p>"Kendrick has always been methodical about his releases," says music journalist Sarah Chen. "When he speaks, the entire culture listens. This announcement has been years in the making."</p>
      
      <p>The post comes amid rumors of collaborations with several high-profile artists, including rumored features from SZA, Baby Keem, and even a potential reunion track with his former Black Hippy collective.</p>
      
      <p>Fans have been dissecting every detail of the post, from the specific timing of its release to the symbolic meaning behind the crown emoji. Social media has exploded with theories and excitement as #KendrickIsBack trends worldwide.</p>
      
      <p>This announcement marks the end of what many considered an unusually quiet period for the Pulitzer Prize-winning artist. Since releasing "Mr. Morale & The Big Steppers," Kendrick has maintained a relatively low profile, appearing only for select performances and collaborations.</p>
      
      <p>The album is expected to continue Kendrick's tradition of pushing artistic boundaries while addressing contemporary social issues. Early reports suggest themes around generational wealth, mental health, and the current state of hip-hop culture.</p>
    `,
    author: "Marcus Johnson",
    authorBio: "Marcus Johnson is a senior music journalist with over 10 years of experience covering hip-hop culture and the music industry.",
    date: "2 hours ago",
    publishedDate: new Date().toISOString(),
    category: "Breaking News",
    readTime: "3 min",
    image: "/src/assets/album-placeholder.jpg",
    tags: ["Kendrick Lamar", "Album Release", "Hip Hop", "Breaking News"],
    relatedArticles: [
      {
        title: "The Evolution of Kendrick Lamar's Sound",
        category: "Analysis",
        readTime: "5 min"
      },
      {
        title: "Black Hippy Reunion: What We Know So Far",
        category: "Rumors",
        readTime: "4 min"
      },
      {
        title: "Top 10 Kendrick Lamar Collaborations",
        category: "Lists",
        readTime: "6 min"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Button>

        <div className="max-w-4xl mx-auto">
          <article className="space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-orange text-orange">
                  {article.category}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-foreground/80 leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between py-4 border-t border-b border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold/20 to-orange/20 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium">{article.author}</p>
                    <p className="text-sm text-muted-foreground">Senior Music Journalist</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime} read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video bg-gradient-to-br from-purple/20 to-pink/20 rounded-lg overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none">
              <div 
                className="text-foreground/90 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ 
                  __html: article.content.split('\n').map(paragraph => 
                    paragraph.trim() ? `<p class="mb-4">${paragraph.trim()}</p>` : ''
                  ).join('') 
                }}
              />
            </div>

            {/* Tags */}
            <div className="pt-8 border-t border-border">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-purple text-purple">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <Card className="bg-dark-card border-border p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-orange/20 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">About {article.author}</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    {article.authorBio}
                  </p>
                </div>
              </div>
            </Card>
          </article>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.relatedArticles.map((related, index) => (
                <Card key={index} className="bg-dark-card border-border hover:border-gold/30 transition-all duration-300 cursor-pointer group">
                  <div className="p-6">
                    <Badge variant="outline" className="border-orange text-orange mb-3">
                      {related.category}
                    </Badge>
                    <h3 className="font-bold mb-2 group-hover:text-gold transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {related.readTime} read
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;