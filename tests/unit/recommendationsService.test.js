/* eslint-disable no-undef */
import * as recommendationsService from '../../src/services/recommendationsService.js';
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js';
import RecommendationsError from '../../src/errors/recommendationsError';

const sut = recommendationsService;

describe('newSong', () => {
    it('Returns the posted song data', async () => {
        const body = {
            id: 1,
            name: 'test Song',
            youtubeLink: 'test Link',
            score: 0,
        };
        jest.spyOn(recommendationsRepository, 'newSong').mockImplementationOnce(() => body);
        const result = await sut.newSong({ name: 'test Song', youtubeLink: 'test Link' });
        expect(result).toEqual(body);
    });
});

describe('increaseScore', () => {
    it('Returns an RecommendationsError for invalid id', async () => {
        jest.spyOn(recommendationsRepository, 'checkSongById').mockImplementationOnce(() => false);
        const promise = sut.increaseScore({ id: 1 });
        await expect(promise).rejects.toThrowError(RecommendationsError);
    });
    it('Returns the upvoted song data', async () => {
        const body = {
            id: 1,
            name: 'test Song',
            youtubeLink: 'test Link',
            score: 1,
        };
        jest.spyOn(recommendationsRepository, 'checkSongById').mockImplementationOnce(() => body);
        jest.spyOn(recommendationsRepository, 'changeScore').mockImplementationOnce(() => body);
        const result = await sut.increaseScore({ id: 1 });
        expect(result).toEqual(body);
    });
});

describe('decreaseScore', () => {
    it('Returns an RecommendationsError for invalid id', async () => {
        jest.spyOn(recommendationsRepository, 'checkSongById').mockImplementationOnce(() => false);
        const promise = sut.decreaseScore({ id: 1 });
        await expect(promise).rejects.toThrowError(RecommendationsError);
    });
    it('Returns the downvoted song data', async () => {
        const body = {
            id: 1,
            name: 'test Song',
            youtubeLink: 'test Link',
            score: 0,
        };
        jest.spyOn(recommendationsRepository, 'checkSongById').mockImplementationOnce(() => body);
        jest.spyOn(recommendationsRepository, 'changeScore').mockImplementationOnce(() => body);
        const result = await sut.decreaseScore({ id: 1 });
        expect(result).toEqual(body);
    });
    it('Returns empty object for deleting bad song', async () => {
        const body = {
            id: 1,
            name: 'test Song',
            youtubeLink: 'test Link',
            score: -5,
        };
        jest.spyOn(recommendationsRepository, 'checkSongById').mockImplementationOnce(() => body);
        jest.spyOn(recommendationsRepository, 'deleteSong').mockImplementationOnce(() => true);
        const result = await sut.decreaseScore({ id: 1 });
        expect(result).toEqual({});
    });
});

describe('randomSong', () => {
    it('Returns an RecommendationsError for no songs avalaible', async () => {
        jest.spyOn(recommendationsRepository, 'getRandomSong').mockImplementationOnce(() => []);
        jest.spyOn(recommendationsRepository, 'getRandomSong').mockImplementationOnce(() => []);
        const promise = sut.randomSong();
        await expect(promise).rejects.toThrowError(RecommendationsError);
    });
    it('Returns a song with more than 10 score', async () => {
        const body = {
            id: 1,
            name: 'test Song',
            youtubeLink: 'test Link',
            score: 15,
        };
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.31);
        jest.spyOn(recommendationsRepository, 'getRandomSong').mockImplementationOnce(() => [body]);
        const result = await sut.randomSong();
        expect(result).toEqual([body]);
    });
    it('Returns a song with less than 10 score', async () => {
        const body = {
            id: 1,
            name: 'test Song',
            youtubeLink: 'test Link',
            score: 5,
        };
        jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.3);
        jest.spyOn(recommendationsRepository, 'getRandomSong').mockImplementationOnce(() => [body]);
        const result = await sut.randomSong();
        expect(result).toEqual([body]);
    });
});

describe('function', () => {
    it('Returns something', async () => {

    });
});
