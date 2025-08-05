import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Zap, Heart } from "lucide-react";

const Culture = () => {
  const cultureArticles = [
    {
      title: "The Evolution of Hip-Hop Fashion Through the Decades",
      excerpt: "From Run-DMC's Adidas to today's designer collaborations, explore how hip-hop has shaped global fashion trends.",
      category: "Fashion",
      readTime: "8 min",
      icon: <Zap className="h-5 w-5" />,
      image: "/src/assets/album-placeholder.jpg"
    },
    {
      title: "How Hip-Hop Became a Global Language",
      excerpt: "Examining the worldwide influence of hip-hop culture and its role in connecting communities across borders.",
      category: "Global Impact",
      readTime: "6 min",
      icon: <Users className="h-5 w-5" />,
      image: "/src/assets/album-placeholder.jpg"
    },
    {
      title: "The Art of Hip-Hop: From Graffiti to Gallery Walls",
      excerpt: "Discover how hip-hop's visual culture has evolved from subway walls to prestigious art galleries worldwide.",
      category: "Visual Arts",
      readTime: "7 min",
      icon: <Heart className="h-5 w-5" />,
      image: "/src/assets/album-placeholder.jpg"
    },
    {
      title: "Breaking and B-Boy Culture: The Dance Revolution",
      excerpt: "The history and evolution of breakdancing as a cornerstone of hip-hop culture and artistic expression.",
      category: "Dance",
      readTime: "5 min",
      icon: <Zap className="h-5 w-5" />,
      image: "/src/assets/album-placeholder.jpg"
    },
    {
      title: "Hip-Hop's Influence on Language and Communication",
      excerpt: "How hip-hop has introduced new words, phrases, and communication styles into mainstream culture.",
      category: "Language",
      readTime: "6 min",
      icon: <Users className="h-5 w-5" />,
      image: "/src/assets/album-placeholder.jpg"
    },
    {
      title: "The Business of Hip-Hop: From Underground to Empire",
      excerpt: "Exploring how hip-hop artists have built business empires and changed the entertainment industry landscape.",
      category: "Business",
      readTime: "9 min",
      icon: <Heart className="h-5 w-5" />,
      image: "/src/assets/album-placeholder.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
            Hip-Hop Culture
          </h1>
          <p className="text-foreground/80 text-lg">
            Exploring the cultural impact and evolution of hip-hop beyond the music
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cultureArticles.map((article, index) => (
            <Card key={index} className="bg-dark-card border-border hover:border-gold/30 transition-all duration-300 cursor-pointer group overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-purple/20 to-pink/20 relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="border-orange text-orange bg-dark-bg/80 backdrop-blur-sm">
                    {article.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="p-2 bg-dark-bg/80 backdrop-blur-sm rounded-lg">
                    {article.icon}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground">{article.readTime} read</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Read More</span>
                  <ArrowRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Culture;