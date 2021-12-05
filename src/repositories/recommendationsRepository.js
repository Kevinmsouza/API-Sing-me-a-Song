import connection from '../database.js';

async function newSong({ name, youtubeLink }) {
    const result = await connection.query(`
        INSERT INTO songs
            (name, youtube_link, score)
        VALUES ($1, $2, 0)
        RETURNING *
    ;`, [name, youtubeLink]);
    return result.rows[0];
}

async function checkSongById({ id }) {
    const result = await connection.query(`
        SELECT * FROM songs
        WHERE id = $1
    ;`, [id]);
    return result.rows[0];
}

async function changeScore({ id, score }) {
    const result = await connection.query(`
        UPDATE songs
        SET score = $2
        WHERE id = $1
        RETURNING *
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

export {
    newSong,
    checkSongById,
    changeScore,
    deleteSong,
};
