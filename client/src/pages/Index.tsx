import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReviewCard from "@/components/ReviewCard";
import NewsCard from "@/components/NewsCard";
import TrendingSection from "@/components/TrendingSection";
import Footer from "@/components/Footer";
import axios from "axios";

interface Track {
  id: string;
  name: string;
  artist: string;
  previewUrl: string | null;
  albumImage: string;
  spotifyUrl: string;
}

const Index = () => {
  const [featuredTrack, setFeaturedTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedTrack = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://barsandbios-1.onrender.com/api/albums/search/track', {
          params: { query: 'Travis Scott FE!N' } // Default search query
        });
        setFeaturedTrack(response.data);
      } catch (err) {
        console.error('Error fetching track:', err);
        setError('Failed to load featured track');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedTrack();
  }, []);

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
      
      {/* Featured Track Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Track</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : featuredTrack ? (
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row items-center">
                <img 
                  src={featuredTrack.albumImage} 
                  alt={featuredTrack.name}
                  className="w-48 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{featuredTrack.name}</h3>
                  <p className="text-gray-300 mb-4">{featuredTrack.artist}</p>
                  {featuredTrack.previewUrl && (
                    <audio 
                      src={featuredTrack.previewUrl} 
                      controls 
                      className="w-full max-w-md mb-4"
                    />
                  )}
                  <a
                    href={featuredTrack.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <span>Play on Spotify</span>
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      
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
