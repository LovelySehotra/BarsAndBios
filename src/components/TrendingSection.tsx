import { Badge } from "@/components/ui/badge";
import { TrendingUp, Flame } from "lucide-react";

const TrendingSection = () => {
  const trendingTopics = [
    { name: "Drake's New Album", count: "1.2k discussions" },
    { name: "Kendrick Feature", count: "890 mentions" },
    { name: "Travis Scott Tour", count: "750 posts" },
    { name: "J. Cole Retirement", count: "650 debates" },
    { name: "Hip-Hop Awards", count: "540 reactions" },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-dark-bg to-dark-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-orange/20 px-4 py-2 rounded-full border border-orange/30">
              <Flame className="h-4 w-4 text-orange" />
              <span className="text-orange font-semibold text-sm">What's Hot</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trending in 
            <span className="bg-gradient-to-r from-orange to-gold bg-clip-text text-transparent"> Hip-Hop</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay up to date with the hottest topics and conversations in the hip-hop community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-dark-card border border-border rounded-lg p-6 hover:border-orange/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="border-orange text-orange">
                  #{index + 1}
                </Badge>
                <TrendingUp className="h-4 w-4 text-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-gold transition-colors">
                {topic.name}
              </h3>
              <p className="text-muted-foreground text-sm">{topic.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;