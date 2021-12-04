import { validateId, validateNewSong } from '../validations/recommendationsValidation.js';
import * as recommendationsService from '../services/recommendationsService.js';

async function AddSong(req, res) {
    try {
        if (validateNewSong(req.body)) return res.sendStatus(400);
        const result = await recommendationsService.newSong(req.body);
        res.status(201).send(result);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.sendStatus(500);
    }
}

async function upVote(req, res) {
    try {
        const id = Number(req.params.id);
        if (validateId(id)) return res.sendStatus(400);
        const result = await recommendationsService.increaseScore({ id });
        res.status(200).send(result);
    } catch (error) {
        if (error.name === 'RecommendationsError') {
            return res.status(400).send(error.message);
        }
        // eslint-disable-next-line no-console
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    AddSong,
    upVote,
};
