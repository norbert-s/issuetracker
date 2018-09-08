const Joi = require('joi');

const postOne = Joi.object().keys({
    title: Joi.string().min(5).max(255).required().error(new Error('title field is mandatory- must be at least 5 and maximum 255 characters')),
    text:Joi.string().min(10).max(255).required().error(new Error('text field is mandatory- must be at least 10 and maximum 255 characters')),
    created_by:Joi.string().min(5).max(255).required().error(new Error('created_by field is mandatory- must be at least 5 and maximum 255 characters'))

});

const updateOne = Joi.object().keys({
    id:Joi.string().required().min(24).error(new Error('id field is mandatory here'))
});

const deleteOne = Joi.object().keys({
    id:Joi.string().required().min(24).error(new Error('_id field is mandatory to delete an issue'))
});

module.exports.postOne = postOne;
module.exports.updateOne = updateOne;
module.exports.deleteOne = deleteOne;