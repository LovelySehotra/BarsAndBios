import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Calendar, Music, Play, Clock } from "lucide-react";

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API/database
  const album = {
    id: id,
    title: "The Off-Season",
    artist: "J. Cole",
    releaseDate: "2021-05-14",
    genre: "Hip Hop",
    rating: 8.5,
    tracks: 12,
    duration: "54:23",
    label: "Dreamville Records",
    producer: "J. Cole, T-Minus",
    image: "/src/assets/album-placeholder.jpg",
    description: "J. Cole's sixth studio album showcases his lyrical prowess and introspective storytelling. The Off-Season finds Cole reflecting on his career, legacy, and place in hip-hop while delivering some of his most personal and technically proficient verses to date.",
    tracklist: [
      { number: 1, title: "95.south", duration: "3:14" },
      { number: 2, title: "amari", duration: "4:21" },
      { number: 3, title: "my.life (feat. 21 Savage & Morray)", duration: "4:38" },
      { number: 4, title: "applying.pressure", duration: "3:58" },
      { number: 5, title: "punchin' .the.clock", duration: "4:02" },
      { number: 6, title: "100.mil'", duration: "4:15" },
      { number: 7, title: "pride.is.the.devil (feat. Lil Baby)", duration: "4:47" },
      { number: 8, title: "let.go.my.hand (feat. Bas & 6LACK)", duration: "5:12" },
      { number: 9, title: "interlude", duration: "2:33" },
      { number: 10, title: "t h e . c l i m b . b a c k", duration: "4:26" },
      { number: 11, title: "close", duration: "3:42" },
      { number: 12, title: "hunger.on.hillside (feat. Bas)", duration: "4:55" }
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
          {/* Album Art and Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="aspect-square bg-gradient-to-br from-purple/20 to-pink/20 rounded-lg overflow-hidden mb-6">
                <img 
                  src={album.image} 
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{album.title}</h1>
                  <p className="text-xl text-orange font-medium">{album.artist}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-gold fill-gold" />
                    <span className="font-medium text-gold">{album.rating}/10</span>
                  </div>
                  <Badge variant="outline" className="border-gold text-gold">
                    {album.genre}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(album.releaseDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Music className="h-4 w-4" />
                    <span>{album.tracks} tracks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{album.duration}</span>
                  </div>
                </div>
                
                <Button variant="hero" className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Play Album
                </Button>
              </div>
            </div>
          </div>

          {/* Album Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="bg-dark-card border-border p-6">
              <h2 className="text-xl font-bold mb-4">About This Album</h2>
              <p className="text-foreground/80 leading-relaxed">{album.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-border">
                <div>
                  <h3 className="font-medium mb-2 text-gold">Label</h3>
                  <p className="text-sm text-muted-foreground">{album.label}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-gold">Producer</h3>
                  <p className="text-sm text-muted-foreground">{album.producer}</p>
                </div>
              </div>
            </Card>

            {/* Tracklist */}
            <Card className="bg-dark-card border-border p-6">
              <h2 className="text-xl font-bold mb-6">Tracklist</h2>
              <div className="space-y-2">
                {album.tracklist.map((track) => (
                  <div 
                    key={track.number}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-dark-bg/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground w-8">
                        {track.number}
                      </span>
                      <div>
                        <p className="font-medium group-hover:text-gold transition-colors">
                          {track.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-muted-foreground">
                        {track.duration}
                      </span>
                      <Play className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
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

export default AlbumDetail;