import RecommendationsError from '../errors/recommendationsError.js';
import * as recommendationsRepository from '../repositories/recommendationsRepository.js';

async function newSong({ name, youtubeLink }) {
    return recommendationsRepository.newSong({ name, youtubeLink });
}

async function increaseScore({ id }) {
    const recommendation = await recommendationsRepository.checkSongById({ id });
    if (!recommendation) {
        throw new RecommendationsError('Recommendation does not exist.');
    }
    return recommendationsRepository.changeScore({ id, score: recommendation.score + 1 });
}

async function decreaseScore({ id }) {
    const recommendation = await recommendationsRepository.checkSongById({ id });
    if (!recommendation) {
        throw new RecommendationsError('Recommendation does not exist.');
    }
    if (recommendation.score === -5) {
        await recommendationsRepository.deleteSong({ id });
        return {};
    }
    return recommendationsRepository.changeScore({ id, score: recommendation.score - 1 });
}

export {
    newSong,
    increaseScore,
    decreaseScore,
};
