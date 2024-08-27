import { Router } from 'express';
import { showAllPosts, showEditPostForm, showNewPostForm, createNewPost, editPost, deletePostbyID } from '../controller/blogController.js';
import { ensureAuthenticated } from '../utils/library.js'; 

const router = Router();

//public routes
router.get("/", showAllPosts);  

//auth required
router.get('/new', ensureAuthenticated, showNewPostForm);  
router.get('/edit/:id', ensureAuthenticated, showEditPostForm);  

router.post('/new', ensureAuthenticated, createNewPost);  
router.post('/edit/:id', ensureAuthenticated, editPost);  

router.delete('/delete/:id', ensureAuthenticated, deletePostbyID);

export default router;
