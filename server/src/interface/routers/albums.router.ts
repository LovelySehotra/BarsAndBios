import { Router } from 'express';
import { AlbumsController } from '@/interface/controllers/albums.controller';

const router = Router();
const albumsController = new AlbumsController();



// Album routes
router.post('/',  albumsController.createAlbum);
router.get('/', albumsController.getAllAlbums);
router.get('/:id', albumsController.getAlbumById);
router.put('/:id', albumsController.updateAlbum);
router.delete('/:id', albumsController.deleteAlbum);

// Spotify integration routes
router.get('/search/track', albumsController.searchTrack);
router.get('/tracks/:id', albumsController.getTrack);

export  default router  ;