import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistCard from "@/components/ArtistCard";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const Artists = () => {
  // Mock data for artists
  const featuredArtists = [
    {
      id: 1,
      name: "Kendrick Lamar",
      genre: "Conscious Rap",
      followers: "15.2M",
      activeYears: "2010-Present",
      location: "Compton, CA",
      image: "/src/assets/album-placeholder.jpg",
      topSongs: ["HUMBLE.", "DNA.", "King Kunta", "Alright", "Money Trees"]
    },
    {
      id: 2,
      name: "J. Cole",
      genre: "Conscious Rap",
      followers: "12.8M",
      activeYears: "2007-Present", 
      location: "Fayetteville, NC",
      image: "/src/assets/album-placeholder.jpg",
      topSongs: ["Middle Child", "No Role Modelz", "Love Yourz", "ATM", "Crooked Smile"]
    },
    {
      id: 3,
      name: "Tyler, The Creator",
      genre: "Alternative Hip-Hop",
      followers: "8.9M",
      activeYears: "2008-Present",
      location: "Los Angeles, CA", 
      image: "/src/assets/album-placeholder.jpg",
      topSongs: ["EARFQUAKE", "See You Again", "Yonkers", "Who Dat Boy", "IGOR'S THEME"]
    }
  ];

  const allArtists = [
    {
      id: 4,
      name: "Drake",
      genre: "Pop Rap",
      followers: "18.7M",
      activeYears: "2006-Present",
      location: "Toronto, ON",
      image: "/src/assets/album-placeholder.jpg",
      topSongs: ["God's Plan", "Hotline Bling", "One Dance", "In My Feelings", "Started From the Bottom"]
    },
    {
      id: 5,
      name: "Travis Scott",
      genre: "Trap",
      followers: "14.3M", 
      activeYears: "2008-Present",
      location: "Houston, TX",
      image: "/src/assets/album-placeholder.jpg",
      topSongs: ["SICKO MODE", "Antidote", "Goosebumps", "Highest in the Room", "STARGAZING"]
    },
    {
      id: 6,
      name: "Lil Baby",
      genre: "Trap",
      followers: "11.5M",
      activeYears: "2015-Present",
      location: "Atlanta, GA",
      image: "/src/assets/album-placeholder.jpg",
      topSongs: ["Drip Too Hard", "Yes Indeed", "Life Goes On", "The Bigger Picture", "We Paid"]
    },
    {
      id: 7,
      name: "Future",
      genre: "Trap",
      followers: "10.2M",
      activeYears: "2010-Present",
      location: "Atlanta, GA",
      image: "/src/assets/album-placeholder.jpg",
      topSongs: ["Mask Off", "Life Is Good", "Jumpman", "March Madness", "Low Life"]
    },
    {
      id: 8,
      name: "21 Savage",
      genre: "Trap",
      followers: "9.8M",
      activeYears: "2013-Present",
      location: "Atlanta, GA",
      image: "/src/assets/album-placeholder.jpg",
      topSongs: ["Rockstar", "A Lot", "Bank Account", "X", "Jimmy Cooks"]
    },
    {
      id: 9,
      name: "Lil Wayne",
      genre: "Southern Hip-Hop",
      followers: "13.1M",
      activeYears: "1995-Present",
      location: "New Orleans, LA",
      image: "/src/assets/album-placeholder.jpg",
      topSongs: ["Lollipop", "A Milli", "6 Foot 7 Foot", "How to Love", "Mirror"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hip-Hop 
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent"> Artists</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover the voices that define hip-hop culture, from legendary pioneers to rising stars
            </p>
            
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  placeholder="Search artists..." 
                  className="w-full pl-10 pr-4 py-3 bg-dark-card border border-border rounded-lg focus:outline-none focus:border-gold text-foreground"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured 
              <span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent"> Artists</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Spotlight on the artists who are shaping the sound of modern hip-hop
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredArtists.map((artist) => (
              <ArtistCard key={artist.id} {...artist} featured />
            ))}
          </div>
        </div>
      </section>

      {/* All Artists */}
      <section className="py-16 bg-dark-card">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              All 
              <span className="bg-gradient-to-r from-orange to-gold bg-clip-text text-transparent"> Artists</span>
            </h2>
            <div className="flex items-center gap-4">
              <select className="bg-dark-bg border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-gold">
                <option>All Genres</option>
                <option>Trap</option>
                <option>Conscious Rap</option>
                <option>Pop Rap</option>
                <option>Alternative Hip-Hop</option>
              </select>
              <select className="bg-dark-bg border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-gold">
                <option>Sort by Popularity</option>
                <option>Sort by Name</option>
                <option>Sort by Year Started</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArtists.map((artist) => (
              <ArtistCard key={artist.id} {...artist} />
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Artists
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Artists;