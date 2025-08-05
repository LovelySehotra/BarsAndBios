import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Music } from "lucide-react";

const Albums = () => {
  const albums = [
    {
      id: 1,
      title: "The Off-Season",
      artist: "J. Cole",
      releaseDate: "2021-05-14",
      genre: "Hip Hop",
      rating: 8.5,
      tracks: 12,
      image: "/src/assets/album-placeholder.jpg"
    },
    {
      id: 2,
      title: "Donda",
      artist: "Kanye West",
      releaseDate: "2021-08-29",
      genre: "Hip Hop",
      rating: 7.8,
      tracks: 27,
      image: "/src/assets/album-placeholder.jpg"
    },
    {
      id: 3,
      title: "Call Me If You Get Lost",
      artist: "Tyler, The Creator",
      releaseDate: "2021-06-25",
      genre: "Hip Hop",
      rating: 9.1,
      tracks: 16,
      image: "/src/assets/album-placeholder.jpg"
    },
    {
      id: 4,
      title: "King's Disease II",
      artist: "Nas",
      releaseDate: "2021-08-06",
      genre: "Hip Hop",
      rating: 8.2,
      tracks: 15,
      image: "/src/assets/album-placeholder.jpg"
    },
    {
      id: 5,
      title: "Certified Lover Boy",
      artist: "Drake",
      releaseDate: "2021-09-03",
      genre: "Hip Hop",
      rating: 7.5,
      tracks: 21,
      image: "/src/assets/album-placeholder.jpg"
    },
    {
      id: 6,
      title: "The Melodic Blue",
      artist: "Baby Keem",
      releaseDate: "2021-09-10",
      genre: "Hip Hop",
      rating: 8.7,
      tracks: 16,
      image: "/src/assets/album-placeholder.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
            Latest Albums
          </h1>
          <p className="text-foreground/80 text-lg">
            Discover the hottest hip-hop albums and classic releases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <Link key={album.id} to={`/album/${album.id}`}>
              <Card className="bg-dark-card border-border hover:border-gold/30 transition-all duration-300 cursor-pointer group overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-purple/20 to-pink/20 relative overflow-hidden">
                <img 
                  src={album.image} 
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="border-gold text-gold bg-dark-bg/80 backdrop-blur-sm">
                    {album.genre}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-dark-bg/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <Star className="h-3 w-3 text-gold fill-gold" />
                    <span className="text-xs font-medium text-gold">{album.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                  {album.title}
                </h3>
                <p className="text-orange font-medium mb-4">{album.artist}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(album.releaseDate).getFullYear()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Music className="h-4 w-4" />
                    <span>{album.tracks} tracks</span>
                  </div>
                </div>
              </div>
            </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Albums;