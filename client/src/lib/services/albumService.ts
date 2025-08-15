import { apiClient } from '@/lib/services/api';

// Types for Album API
export interface IAlbum {
  _id?: string;
  albumId: string;
  title: string;
  artist: string;
  type: 'album' | 'mixtape' | 'EP' | 'single';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateAlbumDto {
  albumId: string;
  title: string;
  artist: string;
  type: 'album' | 'mixtape' | 'EP' | 'single';
}

export interface UpdateAlbumDto extends Partial<CreateAlbumDto> {}

// Album API Service
export class AlbumService {
  // GET /albums - Get all albums
  static async getAllAlbums(): Promise<IAlbum[]> {
    return apiClient.get<IAlbum[]>('/albums');
  }

  // GET /albums/:id - Get album by ID
  static async getAlbumById(id: string): Promise<IAlbum> {
    return apiClient.get<IAlbum>(`/albums/${id}`);
  }

  // POST /albums - Create new album
  static async createAlbum(data: CreateAlbumDto): Promise<IAlbum> {
    return apiClient.post<IAlbum>('/albums', data);
  }

  // PUT /albums/:id - Update album
  static async updateAlbum(id: string, data: UpdateAlbumDto): Promise<IAlbum> {
    return apiClient.put<IAlbum>(`/albums/${id}`, data);
  }

  // DELETE /albums/:id - Delete album
  static async deleteAlbum(id: string): Promise<void> {
    return apiClient.delete<void>(`/albums/${id}`);
  }

  // Spotify integration methods
  static async searchTrack(query: string): Promise<any> {
    return apiClient.get<any>(`/albums/search/track?q=${encodeURIComponent(query)}`);
  }

  static async getTrack(id: string): Promise<any> {
    return apiClient.get<any>(`/albums/tracks/${id}`);
  }
}