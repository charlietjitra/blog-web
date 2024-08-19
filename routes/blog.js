import { Router } from 'express';
import { showAllPosts, showEditPostForm, showNewPostForm, createNewPost, editPost, deletePostbyID } from '../controller/blogController.js';

const router = Router();

router.get("/", showAllPosts);
router.get('/new', showNewPostForm);
router.get('/edit/:id', showEditPostForm);

router.post('/new', createNewPost);
router.post('/edit/:id', editPost);

router.delete('/delete/:id', deletePostbyID)
  

export default router;