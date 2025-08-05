import { Button } from "@/components/ui/button";
import { Music, Search, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-dark-bg/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-gold to-orange rounded-lg">
              <Music className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                HipHop Central
              </h1>
              <p className="text-xs text-muted-foreground">Reviews & News</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-gold transition-colors font-medium">
              Reviews
            </a>
            <a href="/news" className="text-foreground hover:text-gold transition-colors font-medium">
              News
            </a>
            <a href="/artists" className="text-foreground hover:text-gold transition-colors font-medium">
              Artists
            </a>
            <a href="/albums" className="text-foreground hover:text-gold transition-colors font-medium">
              Albums
            </a>
            <a href="/culture" className="text-foreground hover:text-gold transition-colors font-medium">
              Culture
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="hero" className="hidden md:inline-flex" asChild>
              <a href="/submit-review">Submit Review</a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;