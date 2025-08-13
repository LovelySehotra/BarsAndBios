import { Request, Response } from 'express';
import { AlbumsService } from '@/application/services/albums.service';
import { AppError } from '@/interface/middleware';

export class AlbumsController {
    private albumsService: AlbumsService;

    constructor() {
        this.albumsService = new AlbumsService();
    }

    createAlbum = async (req: Request, res: Response): Promise<void> => {
        try {
            const album = await this.albumsService.createAlbum(req.body);
            res.status(201).json(album);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    getAllAlbums = async (_req: Request, res: Response): Promise<void> => {
        try {
            const albums = await this.albumsService.getAllAlbums();
            res.status(200).json(albums);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    getAlbumById = async (req: Request, res: Response): Promise<void> => {
        try {
            const album = await this.albumsService.getAlbumById(req.params.id);
            if (!album) {
                res.status(404).json({ error: 'Album not found' });
                return;
            }
            res.status(200).json(album);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    updateAlbum = async (req: Request, res: Response): Promise<void> => {
        try {
            const album = await this.albumsService.updateAlbum(req.params.id, req.body);
            if (!album) {
                res.status(404).json({ error: 'Album not found' });
                return;
            }
            res.status(200).json(album);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    deleteAlbum = async (req: Request, res: Response): Promise<void> => {
        try {
            const album = await this.albumsService.deleteAlbum(req.params.id);
            if (!album) {
                res.status(404).json({ error: 'Album not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    searchTrack = async (req: Request, res: Response): Promise<void> => {
        try {
            const { query } = req.query;
            if (!query || typeof query !== 'string') {
                res.status(400).json({ error: 'Query parameter is required' });
                return;
            }
            const track = await this.albumsService.searchTrack(query);
            res.status(200).json(track);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to search track' });
            }
        }
    }

    getTrack = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const track = await this.albumsService.getTrack(id);
            res.status(200).json(track);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to get track' });
            }
        }
    }
}