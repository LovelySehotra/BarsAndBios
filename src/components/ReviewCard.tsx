import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, User } from "lucide-react";
import albumPlaceholder from "@/assets/album-placeholder.jpg";

interface ReviewCardProps {
  title: string;
  artist: string;
  rating: number;
  genre: string;
  reviewer: string;
  date: string;
  excerpt: string;
  featured?: boolean;
}

const ReviewCard = ({ 
  title, 
  artist, 
  rating, 
  genre, 
  reviewer, 
  date, 
  excerpt, 
  featured = false 
}: ReviewCardProps) => {
  return (
    <Card className={`overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group ${
      featured ? 'md:col-span-2 bg-gradient-to-br from-dark-card to-dark-bg border-gold/30' : 'bg-dark-card border-border'
    }`}>
      <div className={`flex ${featured ? 'md:flex-row' : 'flex-col'} h-full`}>
        {/* Album Art */}
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/3' : 'w-full h-48'}`}>
          <img
            src={albumPlaceholder}
            alt={`${title} by ${artist}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-gold/90 text-black font-bold">
              {genre}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="text-white font-bold">{rating}/5</span>
          </div>
        </div>
        
        {/* Content */}
        <div className={`p-6 flex-1 ${featured ? 'flex flex-col justify-center' : ''}`}>
          <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{reviewer}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>
          
          <h3 className={`font-bold mb-2 group-hover:text-gold transition-colors ${
            featured ? 'text-2xl' : 'text-lg'
          }`}>
            {title}
          </h3>
          
          <p className="text-muted-foreground font-medium mb-3">by {artist}</p>
          
          <p className={`text-foreground/80 leading-relaxed ${
            featured ? 'text-base' : 'text-sm'
          }`}>
            {excerpt}
          </p>
          
          {featured && (
            <div className="mt-4 flex items-center space-x-2">
              <Badge variant="outline" className="border-gold text-gold">Featured Review</Badge>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;