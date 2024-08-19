import { getAllPosts, getPostbyID, updatePost, deletePost, addPost } from "../models/postModels.js";
import { purgomalum } from "../public/js/purgomalum.js";
import { date } from "../public/js/date.js";

export const showAllPosts = async (req,res)=>{
    try{
        const posts = await getAllPosts();
        console.log('Posts fetched:', posts); 
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
        const post = {
            title :  await purgomalum(req.body.title),
            content : await purgomalum(req.body.content),
            author : await purgomalum(req.body.author),
            date : date(new Date())
        }
        await addPost(post);
        res.redirect('/');
    }catch(error){
        res.status(500).send("error creating psot");
    }
}

export const editPost = async (req,res) => {
    try{
        const id = parseInt(req.params.id)
        const post = {
            title :  await purgomalum(req.body.title),
            content : await purgomalum(req.body.content),
            author : await purgomalum(req.body.author),
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
        await deletePost(parseInt(req.params.id,10));
        res.redirect('/');
    }catch(error){
        res.status(500).send("error deleting post");
    }
}