import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
// import { useAlbumStore } from "@/stores/albumStore";
// import { CreateAlbumDto } from "@lib/services/albumService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Music } from "lucide-react";
import { CreateAlbumDto } from "@/lib/services";
import { AlbumService } from "@/lib/services";

const AddAlbum = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateAlbumDto>({
    albumId: "",
    title: "",
    artist: "",
    type: "album"
  });

  const handleInputChange = (field: keyof CreateAlbumDto) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleTypeChange = (value: CreateAlbumDto['type']) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!formData.albumId.trim() || !formData.title.trim() || !formData.artist.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const result = await AlbumService.createAlbum(formData);
    
    if (result) {
      toast({
        title: "Success",
        description: "Album added successfully!",
      });
      navigate("/albums");
    } else {
      toast({
        title: "Error",
        description: "Failed to add album. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
    };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/albums")}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Add New Album</h1>
              <p className="text-muted-foreground">
                Add a new album to the Hip Hop Central database
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Album Information
              </CardTitle>
              <CardDescription>
                Enter the details for the new album below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="albumId">Album ID *</Label>
                    <Input
                      id="albumId"
                      type="text"
                      placeholder="Enter unique album ID"
                      value={formData.albumId}
                      onChange={handleInputChange("albumId")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter album title"
                      value={formData.title}
                      onChange={handleInputChange("title")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="artist">Artist *</Label>
                    <Input
                      id="artist"
                      type="text"
                      placeholder="Enter artist name"
                      value={formData.artist}
                      onChange={handleInputChange("artist")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={handleTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select album type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="album">Album</SelectItem>
                        <SelectItem value="mixtape">Mixtape</SelectItem>
                        <SelectItem value="EP">EP</SelectItem>
                        <SelectItem value="single">Single</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/albums")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    // disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? "Adding..." : "Add Album"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddAlbum;