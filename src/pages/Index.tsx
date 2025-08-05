import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReviewCard from "@/components/ReviewCard";
import NewsCard from "@/components/NewsCard";
import TrendingSection from "@/components/TrendingSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Mock data for reviews
  const featuredReview = {
    title: "DAMN.",
    artist: "Kendrick Lamar",
    rating: 5,
    genre: "Hip-Hop",
    reviewer: "Marcus Johnson",
    date: "2 days ago",
    excerpt: "Kendrick delivers a masterpiece that perfectly balances commercial appeal with deep social commentary. Every track tells a story, and the production is absolutely flawless. This album solidifies his position as one of the greatest artists of our generation."
  };

  const recentReviews = [
    {
      title: "Call Me If You Get Lost",
      artist: "Tyler, The Creator",
      rating: 4,
      genre: "Alternative Hip-Hop",
      reviewer: "Sarah Williams",
      date: "1 week ago",
      excerpt: "Tyler continues to evolve his sound with this vibrant, passport-stamped journey through different musical landscapes."
    },
    {
      title: "Donda",
      artist: "Kanye West",
      rating: 3,
      genre: "Experimental",
      reviewer: "David Chen",
      date: "3 days ago",
      excerpt: "A sprawling, ambitious project that showcases Kanye's continued innovation, though it sometimes feels unfocused."
    },
    {
      title: "The Off-Season",
      artist: "J. Cole",
      rating: 4,
      genre: "Conscious Rap",
      reviewer: "Jennifer Lopez",
      date: "5 days ago",
      excerpt: "Cole delivers introspective bars over smooth production, proving he's still at the top of his lyrical game."
    }
  ];

  const newsArticles = [
    {
      title: "Drake Announces Surprise Album Drop Next Month",
      excerpt: "The Toronto rapper hints at a collaborative project featuring several surprise guests from the hip-hop and R&B world.",
      author: "Alex Rivera",
      date: "2 hours ago",
      category: "Breaking News",
      readTime: "3 min"
    },
    {
      title: "The Rise of Regional Hip-Hop: How Local Scenes Are Changing the Game",
      excerpt: "From Atlanta's trap dominance to Detroit's gritty revival, regional sounds are reshaping hip-hop's landscape.",
      author: "Maya Patel",
      date: "1 day ago",
      category: "Culture",
      readTime: "8 min"
    },
    {
      title: "Grammy Nominations: Hip-Hop Categories See Record Diversity",
      excerpt: "This year's nominations showcase the genre's evolution with representation across multiple sub-genres and demographics.",
      author: "Tony Martinez",
      date: "3 days ago",
      category: "Awards",
      readTime: "5 min"
    },
    {
      title: "Streaming Numbers: How TikTok Is Changing Hip-Hop Discovery",
      excerpt: "Artists are increasingly crafting hooks with the social media platform in mind, fundamentally altering song structure.",
      author: "Lisa Chang",
      date: "1 week ago",
      category: "Industry",
      readTime: "6 min"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Featured Review Section */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured 
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent"> Review</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our editors pick the most significant album releases and provide in-depth analysis
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ReviewCard {...featuredReview} featured />
          </div>
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="py-16 bg-dark-card">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Recent 
              <span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent"> Reviews</span>
            </h2>
            <a href="#" className="text-gold hover:text-orange transition-colors font-medium">
              View All Reviews →
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </section>

      <TrendingSection />

      {/* Latest News Section */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Latest 
              <span className="bg-gradient-to-r from-orange to-gold bg-clip-text text-transparent"> News</span>
            </h2>
            <a href="#" className="text-gold hover:text-orange transition-colors font-medium">
              All News →
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsArticles.map((article, index) => (
              <NewsCard key={index} {...article} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
