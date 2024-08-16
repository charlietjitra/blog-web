import { Router } from 'express';
import { purgomalum } from '../public/js/purgomalum.js';
import { date } from '../public/js/date.js';

const router = Router();
let posts = [
    {
        
        title:"Cadillac Super Cruise Review: This Is The Hands-Free Future Of Highway Driving",
        content:"Car companies are trying to make a lot of new technology happen all at once. Not all of it is going to stick.When we talk to car buyers, we hear they want affordability, electric range and easy-to-use tech features. That’s why I doubt many consumers will make their next car purchase based on which model has built-in ChatGPT, though",
        author:"James Lyle",
        date: "2024-04-20"
    },
    {
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
        author:"Noah Parker",
        date: "2024-08-17"
    },
    {
        title: "Great cars everyone should drive at least once",
        content: "But what about individual brands’ biggest-selling cars of all time? So we reached for our calculator and started digging – some of the information was easy to find, others less so. And some of the results were surprising – many marques' best-sellers were last sold a long time ago, so join us on an intriguing and varied journey. For this list we have focused on nameplates, rather than distinct models.",
        author:"Mike Brown",
        date: "2024-07-02"
    }

];

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

router.post("/new", async (req, res)=>{
    const post = {
        title :  await purgomalum(req.body.title),
        content : await purgomalum(req.body.content),
        author : await purgomalum(req.body.author),
        date : date(new Date())
    }

    posts.push(post);
    res.redirect('/');
});

router.delete("/delete/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index > -1) {
        posts.splice(index, 1);
    }else{
        res.status(404).json({message:"error deleting"});
    }
    res.redirect("/");
});

router.post("/edit/:index", async (req, res) => {
    try {
      const index = parseInt(req.params.index, 10);
  
      if (index < 0 || index >= posts.length) {
        return res.status(404).send("Post not found");
      }
  
      posts[index] = {
        title: await purgomalum(req.body.title),
        content: await purgomalum(req.body.content),
        author : await purgomalum(req.body.author),
        date : date(new Date())
      };
  
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while editing the post");
    }
});
  
  
  

export default router;