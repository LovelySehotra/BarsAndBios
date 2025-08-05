import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Calendar, Music, Users, ExternalLink } from "lucide-react";

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API/database
  const artist = {
    id: id,
    name: "Kendrick Lamar",
    realName: "Kendrick Lamar Duckworth",
    origin: "Compton, California",
    activeYears: "2003–present",
    genres: ["Hip Hop", "Conscious Rap", "Jazz Rap"],
    labels: ["Top Dawg Entertainment", "Aftermath", "Interscope"],
    image: "/src/assets/album-placeholder.jpg",
    bio: "Kendrick Lamar Duckworth is an American rapper and songwriter. Known for his progressive musical styles and socially conscious songwriting, he is often cited as one of the most influential hip hop artists of his generation. Born and raised in Compton, California, Lamar began his musical career as a teenager under the stage name K.Dot.",
    stats: {
      albums: 5,
      grammys: 17,
      platinumAlbums: 4,
      monthlyListeners: "45.2M"
    },
    discography: [
      {
        title: "good kid, m.A.A.d city",
        year: 2012,
        type: "Studio Album",
        rating: 9.2
      },
      {
        title: "To Pimp a Butterfly",
        year: 2015,
        type: "Studio Album", 
        rating: 9.5
      },
      {
        title: "DAMN.",
        year: 2017,
        type: "Studio Album",
        rating: 8.8
      },
      {
        title: "Mr. Morale & The Big Steppers",
        year: 2022,
        type: "Studio Album",
        rating: 8.6
      }
    ],
    achievements: [
      "Pulitzer Prize for Music (2018)",
      "17 Grammy Awards",
      "8 Billboard Music Awards",
      "6 BET Awards",
      "3 Brit Awards"
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
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Artist Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="aspect-square bg-gradient-to-br from-purple/20 to-pink/20 rounded-lg overflow-hidden mb-6">
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
                  <p className="text-lg text-muted-foreground">{artist.realName}</p>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{artist.origin}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Active {artist.activeYears}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {artist.genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="border-orange text-orange">
                      {genre}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <Card className="bg-dark-card border-border p-4">
                  <h3 className="font-medium mb-3 text-gold">Artist Stats</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Albums</p>
                      <p className="font-medium">{artist.stats.albums}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Grammys</p>
                      <p className="font-medium">{artist.stats.grammys}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Platinum</p>
                      <p className="font-medium">{artist.stats.platinumAlbums}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly</p>
                      <p className="font-medium">{artist.stats.monthlyListeners}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Artist Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <Card className="bg-dark-card border-border p-6">
              <h2 className="text-xl font-bold mb-4">Biography</h2>
              <p className="text-foreground/80 leading-relaxed mb-6">{artist.bio}</p>
              
              <div>
                <h3 className="font-medium mb-3 text-gold">Record Labels</h3>
                <div className="flex flex-wrap gap-2">
                  {artist.labels.map((label) => (
                    <Badge key={label} variant="outline" className="border-purple text-purple">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Discography */}
            <Card className="bg-dark-card border-border p-6">
              <h2 className="text-xl font-bold mb-6">Discography</h2>
              <div className="space-y-4">
                {artist.discography.map((album, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-dark-bg/50 rounded-lg hover:bg-dark-bg/70 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-orange/20 rounded-lg flex items-center justify-center">
                        <Music className="h-6 w-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-gold transition-colors">
                          {album.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {album.type} • {album.year}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gold">{album.rating}/10</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="bg-dark-card border-border p-6">
              <h2 className="text-xl font-bold mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artist.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-dark-bg/50 rounded-lg">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistDetail;