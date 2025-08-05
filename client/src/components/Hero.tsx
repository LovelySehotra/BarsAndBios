import { Button } from "@/components/ui/button";
import { Play, Star, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 via-dark-bg/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <div className="max-w-3xl">
          <div className="flex items-center justify-center md:justify-start mb-6">
            <div className="flex items-center space-x-2 bg-gold/20 px-4 py-2 rounded-full border border-gold/30">
              <TrendingUp className="h-4 w-4 text-gold" />
              <span className="text-gold font-semibold text-sm">Latest Hip-Hop Reviews</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Ultimate 
            <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent block">
              Hip-Hop Hub
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Discover the latest album reviews, breaking news, and exclusive insights 
            from the world of hip-hop culture. From underground gems to chart-toppers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button variant="hero" size="lg" className="group">
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Explore Reviews
            </Button>
            <Button variant="accent" size="lg" className="group">
              <Star className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Latest News
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-center md:justify-start space-x-8 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">500+</div>
              <div className="text-sm text-muted-foreground">Album Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange">1.2K</div>
              <div className="text-sm text-muted-foreground">News Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple">50K</div>
              <div className="text-sm text-muted-foreground">Monthly Readers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;