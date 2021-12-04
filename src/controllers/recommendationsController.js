import { validateNewSong } from '../validations/recommendationsValidation.js';
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

export {
    AddSong,
};
