import Joi from 'joi';

function validateNewSong(song) {
    // eslint-disable-next-line
    const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
    const schema = Joi.object({
        name: Joi.string().required(),
        youtubeLink: Joi.string().required().pattern(youtubeRegex),
    });
    return !!schema.validate(song).error;
}

export {
    validateNewSong,
};
