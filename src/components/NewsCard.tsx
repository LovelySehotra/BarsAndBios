import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowRight } from "lucide-react";

interface NewsCardProps {
  id?: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

const NewsCard = ({ id = 1, title, excerpt, author, date, category, readTime }: NewsCardProps) => {
  return (
    <Link to={`/news/${id}`}>
      <Card className="bg-dark-card border-border hover:border-gold/30 transition-all duration-300 cursor-pointer group overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="border-orange text-orange">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{readTime} read</span>
        </div>
        
        <h3 className="text-lg font-bold mb-3 group-hover:text-gold transition-colors leading-tight">
          {title}
        </h3>
        
        <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{date}</span>
            </div>
          </div>
          
          <ArrowRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </Card>
  </Link>
  );
};

export default NewsCard;