import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Kendrick Lamar Announces Surprise Album Release Date",
      excerpt: "The Compton rapper drops hints about his upcoming project in a cryptic Instagram post, sending fans into a frenzy.",
      author: "Marcus Johnson",
      date: "2 hours ago",
      category: "Breaking News",
      readTime: "3 min"
    },
    {
      id: 2,
      title: "Drake's Latest Album Breaks Streaming Records",
      excerpt: "The Canadian superstar's new release achieves unprecedented numbers on all major streaming platforms within 24 hours.",
      author: "Sarah Chen",
      date: "5 hours ago",
      category: "Industry News",
      readTime: "4 min"
    },
    {
      id: 3,
      title: "J. Cole Announces Dreamville Festival 2024 Lineup",
      excerpt: "The North Carolina festival returns with an incredible lineup featuring both established and emerging hip-hop artists.",
      author: "David Rodriguez",
      date: "1 day ago",
      category: "Events",
      readTime: "2 min"
    },
    {
      id: 4,
      title: "The Rise of Female Rappers in 2024",
      excerpt: "An in-depth look at how women are reshaping the hip-hop landscape with their unique voices and perspectives.",
      author: "Jasmine Williams",
      date: "2 days ago",
      category: "Culture",
      readTime: "6 min"
    },
    {
      id: 5,
      title: "Vinyl Sales Surge as Hip-Hop Embraces Physical Media",
      excerpt: "Classic and new hip-hop albums are driving a renaissance in vinyl record sales across the globe.",
      author: "Mike Thompson",
      date: "3 days ago",
      category: "Industry News",
      readTime: "5 min"
    },
    {
      id: 6,
      title: "Travis Scott's Astroworld Documentary Premieres",
      excerpt: "A new documentary examines the events and aftermath of the controversial Houston festival.",
      author: "Lisa Park",
      date: "4 days ago",
      category: "Entertainment",
      readTime: "4 min"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
            Latest Hip-Hop News
          </h1>
          <p className="text-foreground/80 text-lg">
            Stay updated with the latest happenings in the hip-hop world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <NewsCard key={index} {...article} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;