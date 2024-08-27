import pool  from './db.js';

export const getAllPosts = async () => {
    const result = await pool.query("SELECT * FROM posts ORDER BY date DESC");
    return result.rows;
}

export const getPostbyID = async (id) => {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1",[id]);
    return result.rows[0];
}

export const addPost = async (post) => {
    const result = await pool.query(
        "INSERT INTO posts (title, content, author, date, user_id) VALUES ($1, $2, $3, $4, $5)",[post.title, post.content, post.author, post.date, post.user_id]
    )
    return result.rows[0];
}

export const updatePost = async (id, post) => {
    const result = await pool.query(
        "UPDATE posts SET title=$1, content=$2, date=$3 WHERE id=$4 RETURNING *",[post.title, post.content, post.date, id]
    )
    return result.rows[0];
}

export const deletePost = async (id) => {
    const result = await pool.query("DELETE FROM posts WHERE id=$1",[id]);
}
