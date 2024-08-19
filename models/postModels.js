import pool  from './db.js';

export const getAllPosts = async () => {
    const result = await pool.query("SELECT * FROM posts ORDER BY date DESC");
    console.log(result.rows);
    return result.rows;
}

export const getPostbyID = async (id) => {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1",[id]);
    return result.rows[0];
}

export const addPost = async (post) => {
    const result = await pool.query(
        "INSERT INTO posts (title, content, author, date) VALUES ($1, $2, $3, $4) RETURNING *",[post.title, post.content, post.author, post.date]
    )
    return result.rows[0];
}

export const updatePost = async (id, post) => {
    const result = await pool.query(
        "UPDATE posts SET title=$1, content=$2, author=$3, date=$4 WHERE id=$5 RETURNING *",[post.title, post.content, post.author, post.date, id]
    )
    return result.rows[0];
}

export const deletePost = async (id) => {
    const result = await pool.query("DELETE FROM posts WHERE id=$1",[id]);
}
