const {check} = require('express-validator')

exports.blogValidators = [
    check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),

    check('content')
    .notEmpty()
    .withMessage('Content is required')
    .isString()
    .withMessage('Content must be a string'),

    check('permaLink')
    .notEmpty()
    .withMessage('Permalink is required'),

    check('author')
    .notEmpty()
    .withMessage('Author is required')
    .isString()
    .withMessage('Author must be a string'),

    check('category')
    .notEmpty()
    .withMessage('Category is required')
    .isString()
    .withMessage('Category must be a string'),

    check('subcategory')
    .notEmpty()
    .withMessage('Subcategory is required')
    .isString()
    .withMessage('Subcategory must be a string'),

    check('feature_image')
    .notEmpty()
    .withMessage('Feature image is required')
    .isString()
    .withMessage('Feature image must be a string'),

    check('tags')
    .notEmpty()
    .withMessage('Tags are required')
    .isArray({min: 2})
    .withMessage('Add minimum 2 tags')
]