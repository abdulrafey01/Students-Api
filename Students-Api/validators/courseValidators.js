const {check} = require('express-validator')

exports.courseValidators = [
    check('course_id')
    .notEmpty()
    .withMessage('Course id is required')
    .isString()
    .withMessage('Course id must be a string'),

    check('course_name')
    .notEmpty()
    .withMessage('Course name is required')
    .isString()
    .withMessage('Course name must be a string'),

    check('course_description')
    .notEmpty()
    .withMessage('Course description is required')
    .isString()
    .withMessage('Course description must be a string'),

    check('course_duration')
    .notEmpty()
    .withMessage('Course duration is required')
    .isString()
    .withMessage('Course duration must be a string'),

    check('course_outline')
    .notEmpty()
    .withMessage('Course outline is required')
    .isString()
    .withMessage('Course outline must be a string'),

    check('course_outcomes')
    .notEmpty()
    .withMessage('Course outcomes is required')
    .isString()
    .withMessage('Course outcomes must be a string'),

    check('course_type')
    .notEmpty()
    .withMessage('Course Type is required')
    .isString()
    .withMessage('Course Type must be a string'),
]