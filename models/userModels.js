import pool from "./db.js";
import bcrypt from "bcrypt";

export const findByEmail = async(email) => {
    const result = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
    return result.rows[0];
};
export const findById = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id=$1",[id]);
    return result.rows[0];
};

export const checkPass = async(inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

export const create = async (fname, lname, email, password) => {
    const result = await pool.query("INSERT INTO users (fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [fname, lname, email, password]
    );
    return result.rows[0]; 
};
