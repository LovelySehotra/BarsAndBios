import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Users, Calendar } from "lucide-react";

interface ArtistCardProps {
  id?: number;
  name: string;
  genre: string;
  followers: string;
  activeYears: string;
  location: string;
  image: string;
  topSongs: string[];
  featured?: boolean;
}

const ArtistCard = ({ 
  id = 1,
  name, 
  genre, 
  followers, 
  activeYears, 
  location, 
  image, 
  topSongs,
  featured = false 
}: ArtistCardProps) => {
  return (
    <Link to={`/artist/${id}`}>
      <Card className={`group overflow-hidden hover:shadow-elegant transition-all duration-300 bg-dark-card border-border hover:border-gold/50 ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}>
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button 
            size="icon" 
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gold/90 hover:bg-gold text-black"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground group-hover:text-gold transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple/20 text-purple border-purple/30">
                  {genre}
                </Badge>
                <span className="text-sm text-muted-foreground">• {location}</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{followers} followers</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{activeYears}</span>
              </div>
            </div>
            
            {/* Top Songs */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Popular Tracks:</h4>
              <div className="space-y-1">
                {topSongs.slice(0, 3).map((song, index) => (
                  <div key={index} className="text-sm text-muted-foreground hover:text-gold transition-colors cursor-pointer">
                    {index + 1}. {song}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArtistCard;