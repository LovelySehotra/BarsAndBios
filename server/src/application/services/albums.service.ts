import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "@/config";
import { getAccessToken } from "@/config/spotify";
import { Album, IAlbum } from "@/domain/models/Album";
import { AppError } from "@/interface/middleware";
import axios from "axios";

export class AlbumsService {

    async createAlbum(data: Partial<IAlbum>): Promise<IAlbum> {
        const album = new Album(data);
        const savedAlbum = await album.save();
        if (!savedAlbum) {
            throw new AppError("Failed to create album", 500, "FAILED_TO_CREATE_ALBUM");
        }
        return savedAlbum;
    }

    async getAllAlbums(): Promise<IAlbum[]> {
        const albumList = await Album.find().sort({ createdAt: -1 });
        if (!albumList) {
            throw new AppError("Failed to get albums", 500, "FAILED_TO_GET_ALBUMS");
        }
        return albumList;
    }

    async getAlbumById(id: string): Promise<IAlbum | null> {
        const album = await Album.findById(id);
        if (!album) {
            throw new AppError("Failed to get album", 500, "FAILED_TO_GET_ALBUM");
        }
        return album;
    }

    async updateAlbum(id: string, data: Partial<IAlbum>): Promise<IAlbum | null> {
        const updatedAlbum = await Album.findByIdAndUpdate(id, data, { new: true });
        if (!updatedAlbum) {
            throw new AppError("Failed to update album", 500, "FAILED_TO_UPDATE_ALBUM");
        }
        return updatedAlbum;
    }

    async deleteAlbum(id: string): Promise<IAlbum | null> {
        const deletedAlbum = await Album.findByIdAndDelete(id);
        if (!deletedAlbum) {
            throw new AppError("Failed to delete album", 500, "FAILED_TO_DELETE_ALBUM");
        }
        return deletedAlbum;
    }

  

    async getTrack(id: string): Promise<any> {
        try {
            const token = await getAccessToken();
            const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw new AppError("Failed to fetch track from Spotify", 500, "SPOTIFY_API_ERROR");
        }
    }

    async searchTrack(query: string): Promise<any> {
        try {
            const token = await getAccessToken();
            const response = await axios.get(`https://api.spotify.com/v1/search`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { q: query, type: 'track', limit: 1 }
            });

            const track = response.data.tracks?.items?.[0];
            if (!track) {
                throw new AppError("No tracks found", 404, "TRACK_NOT_FOUND");
            }

            return {
                ...track
            };
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to search tracks on Spotify", 500, "SPOTIFY_API_ERROR");
        }
    }
}
