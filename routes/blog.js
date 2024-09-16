import { Router } from 'express';
import { showAllPosts, showEditPostForm, showNewPostForm, createNewPost, editPost, deletePostbyID } from '../controller/blogController.js';
import { verifyUserToken } from '../utils/jwt.js'; 

const router = Router();

//public routes
router.get("/", showAllPosts);  

//auth required
router.get('/new', verifyUserToken, showNewPostForm);  
router.get('/edit/:id', verifyUserToken, showEditPostForm);  

router.post('/new', verifyUserToken, createNewPost);  
router.post('/edit/:id', verifyUserToken, editPost);  

router.delete('/delete/:id', verifyUserToken, deletePostbyID);

export default router;
