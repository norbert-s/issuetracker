const Joi = require('joi');

const postOne = Joi.object().keys({
    title: Joi.string().min(3).max(255).required().error(new Error('title field is mandatory- must be at least 5 and maximum 255 characters')),
    text:Joi.string().min(10).max(3000).required().error(new Error('text field is mandatory- must be at least 10 and maximum 1000 characters')),
    created_by:Joi.string().min(3).max(255).required().error(new Error('created_by field is mandatory- must be at least 5 and maximum 255 characters'))

});

const updateOne = Joi.object().keys({
    id:Joi.string().required().min(24).error(new Error('id field is mandatory here'))
});

const deleteOne = Joi.object().keys({
    id:Joi.string().required().min(24).error(new Error('_id field is mandatory to delete an issue'))
});
const getOne = Joi.object().keys({
    title: Joi.string().max(255).error(new Error('title field - must not be more than 255 characters')),
    text:Joi.string().max(3000).error(new Error('text field - must not be more than 3000 characters')),
    created_by:Joi.string().max(255).error(new Error('created_by field - must not be more than 255 characters')),
    assignedTo : Joi.string().max(255).error(new Error('assigned_to field - must not be more than 255 characters')),
    statusText :Joi.string().max(30).error(new Error('status_text field - must not be more than 30 characters'))
});

module.exports.postOne = postOne;
module.exports.updateOne = updateOne;
module.exports.deleteOne = deleteOne;
module.exports.getOne = getOne;