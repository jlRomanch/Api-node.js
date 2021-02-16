const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', async (req, res) => {
    const {title, text, country_id, language_id} = req.body
    const datenow = new Date().toLocaleString()
    try{
        const createdPost = await db.query(
            'INSERT INTO posts (title, text, date, country_id, language_id, created_at, updated_at) \
            values ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, text, datenow, country_id, language_id, datenow, datenow]);
        res.json(createdPost.rows);
    } catch (err) {
        res.json({message: err});
    }
});

router.get('/', async (req, res) => {
    try{
        const posts = await db.query('SELECT * FROM posts');
        res.json(posts.rows);
    } catch (err) {
        res.json({message: err});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const {rows: [post]} = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const {title, text, country_id, language_id} = req.body
    try{
        const updatedPost = await db.query(
            'UPDATE posts SET title = $1, text = $2, country_id = $3, language_id = $4, updated_at = $5 where id = $6 RETURNING *',
            [title, text, country_id, language_id, new Date().toLocaleString(), id]
        );
        res.json(updatedPost.rows[0]);
    } catch (err) {
        res.json({message: err});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const deletedPost = await db.query('DELETE FROM posts WHERE id = $1', [id])
        res.json(deletedPost.rows);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;

