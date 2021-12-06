import connection from '../database.js';

async function newSong({ name, youtubeLink }) {
    const result = await connection.query(`
        INSERT INTO songs
            (name, youtube_link, score)
        VALUES ($1, $2, 0)
        RETURNING 
            id, 
            name, 
            youtube_link as "youtubeLink", 
            score 
    ;`, [name, youtubeLink]);
    return result.rows[0];
}

async function checkSongById({ id }) {
    const result = await connection.query(`
        SELECT 
            id, 
            name, 
            youtube_link as "youtubeLink", 
            score 
        FROM songs
        WHERE id = $1
    ;`, [id]);
    return result.rows[0];
}

async function changeScore({ id, score }) {
    const result = await connection.query(`
        UPDATE songs
        SET score = $2
        WHERE id = $1
        RETURNING 
            id, 
            name, 
            youtube_link as "youtubeLink", 
            score 
    ;`, [id, score]);
    return result.rows[0];
}

async function deleteSong({ id }) {
    const result = await connection.query(`
        DELETE FROM songs
        WHERE id = $1
    ;`, [id]);
    return result.rowCount > 0;
}

async function getRandomSong({ onlyGoods }) {
    let query = 'SELECT id, name, youtube_link as "youtubeLink", score FROM songs';
    if (onlyGoods) query += ' WHERE score > 10';
    query += ' ORDER BY RANDOM() LIMIT 1;';
    const result = await connection.query(query);
    return result.rows;
}

async function listTopSongs({ amount }) {
    const result = await connection.query(`
        SELECT 
            id, 
            name, 
            youtube_link as "youtubeLink", 
            score 
        FROM songs
        ORDER BY score DESC
        LIMIT $1
    ;`, [amount]);
    return result.rows;
}

export {
    newSong,
    checkSongById,
    changeScore,
    deleteSong,
    getRandomSong,
    listTopSongs,
};
