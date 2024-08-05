import { Router } from 'express';

const router = Router();
let posts = [];

router.get("/", (req, res)=>{
    res.render("pages/index", { posts });
});

router.get("/new", (req, res)=>{
    res.render("pages/new",{ post:{}, index:null});
});

router.get("/edit/:index",(req,res)=>{
    const index = req.params.index;
    const post = posts[index];
    res.render("pages/new",{post, index});
});

router.post("/new", (req, res)=>{
    const post = {
        title : req.body.title,
        content : req.body.content
    }

    posts.push(post);
    res.redirect('/');
});

router.delete("/delete/:index", (req, res) => {
    const index = req.params.index;
    if (index > -1) {
        posts.splice(index, 1);
    }
    res.redirect("/");
});

router.post("/edit/:index",(req,res)=>{
    const index = req.params.index;
    posts[index] = {
        title : req.body.title,
        content : req.body.content
    };
    res.redirect('/');
});


export default router;