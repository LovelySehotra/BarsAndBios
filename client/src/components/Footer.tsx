import { Music, Instagram, Twitter, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-gold to-orange rounded-lg">
                <Music className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                  HipHop Central
                </h3>
                <p className="text-xs text-muted-foreground">Reviews & News</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your ultimate destination for hip-hop album reviews, breaking news, 
              and cultural insights. Stay connected with the pulse of hip-hop.
            </p>
            <div className="flex space-x-4">
              <div className="p-2 bg-dark-card hover:bg-gold/20 rounded-lg transition-colors cursor-pointer">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-gold transition-colors" />
              </div>
              <div className="p-2 bg-dark-card hover:bg-gold/20 rounded-lg transition-colors cursor-pointer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-gold transition-colors" />
              </div>
              <div className="p-2 bg-dark-card hover:bg-gold/20 rounded-lg transition-colors cursor-pointer">
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-gold transition-colors" />
              </div>
              <div className="p-2 bg-dark-card hover:bg-gold/20 rounded-lg transition-colors cursor-pointer">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-gold transition-colors" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Latest Reviews", "Breaking News", "Featured Artists", "Album Rankings", "Editorial"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              {["Trap", "Old School", "Underground", "Mainstream", "Regional"].map((category) => (
                <li key={category}>
                  <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 HipHop Central. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;