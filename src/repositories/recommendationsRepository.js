import connection from '../database.js';

async function newSong({ name, youtubeLink }) {
    const result = await connection.query(`
        INSERT INTO songs
            (name, youtube_link, score)
        VALUES
            ($1, $2, 0)
        RETURNING
            *
    ;`, [name, youtubeLink]);
    return result.rows[0];
}

export {
    newSong,
};
