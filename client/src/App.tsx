import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Artists from "./pages/Artists";
import Albums from "./pages/Albums";
import AlbumDetail from "./pages/AlbumDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Culture from "./pages/Culture";
import SubmitReview from "./pages/SubmitReview";
import ArtistDetail from "./pages/ArtistDetail";
import NotFound from "./pages/NotFound";
import AddNewsArticle from "./pages/AddNewsArticle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/album/:id" element={<AlbumDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/add-news" element={<AddNewsArticle />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/submit-review" element={<SubmitReview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
