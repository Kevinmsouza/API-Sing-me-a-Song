import * as recommendationsRepository from '../repositories/recommendationsRepository.js';

async function newSong({ name, youtubeLink }) {
    return recommendationsRepository.newSong({ name, youtubeLink });
}

export {
    newSong,
};
