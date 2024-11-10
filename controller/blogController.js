import { getAllPosts, getPostbyID, updatePost, deletePost, addPost } from "../models/postModels.js";
import { purgomalum } from "../public/js/purgomalum.js";
import { date } from "../public/js/date.js";
import { redisC } from "../utils/redis.js";

export const showAllPosts = async (req,res)=>{
    
    let result;
    let isCached = false;

    try{
        const posts = await getAllPosts();
        res.render("pages/index",{posts});
    }catch(error){
        res.status(500).send("error fetching post");
    }
}

export const showNewPostForm = (req,res) => {
    res.render("pages/new",{ post:{}, index:null});
};

export const showEditPostForm = async (req,res)=>{
    try{
        const post = await getPostbyID(parseInt(req.params.id));

        if(post.user_id != req.user.id){
            return res.status(403).send("You don't have authorization to update this post");
        }

        if(!post){
            res.status(404).send("Post not found");
        }
        res.render("pages/new",{post, index:req.params.id});
    }catch(error){
        res.status(500).send("error fetching post 2");
    }
}

export const createNewPost = async (req,res) => {
    try{
        const author = `${req.user.fname} ${req.user.lname}`;
        const post = {
            title :  await purgomalum(req.body.title),
            content : await purgomalum(req.body.content),
            author : await purgomalum(author),
            date : date(new Date()),
            user_id : req.user.id
        }
        await addPost(post);
        res.redirect('/');
    }catch(error){
        res.status(500).send("error creating post");
    }
}

export const editPost = async (req,res) => {
    try{
        const id = parseInt(req.params.id)
        const post = {
            title :  await purgomalum(req.body.title),
            content : await purgomalum(req.body.content),
            date : date(new Date())
        }
        await updatePost(id, post);
        res.redirect('/');
    }catch(error){
        res.status(500).send("error updating post");
    }
}


export const deletePostbyID = async (req,res) => {
    try{
        const post = await getPostbyID(parseInt(req.params.id,10));
        if (post.user_id !== req.user.id) {
            return res.status(403).send("You don't have permission to delete this post.");
        }
        await deletePost(parseInt(req.params.id,10));
        res.redirect('/');
    }catch(error){
        res.status(500).send("error deleting post");
    }
}