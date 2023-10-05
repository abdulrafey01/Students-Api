const { check } = require('express-validator');

exports.studentValidators = [
  check('studentId')
    .notEmpty()
    .withMessage('Student Id is required')
    .isString()
    .withMessage('Student Id must be a string'),

  check('name.firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string'),

  check('name.lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string'),

  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  check('cnic')
    .notEmpty()
    .withMessage('CNIC is required')
    .isString()
    .withMessage('CNIC must be a string'),

  check('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isString()
    .withMessage('Gender must be a string'),

  check('course')
    .notEmpty()
    .withMessage('Course is required')
    .isString()
    .withMessage('Course must be a string'),

  check('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isString()
    .withMessage('Phone number must be a string'),

  check('address.addressLine')
    .notEmpty()
    .withMessage('Address line is required')
    .isString()
    .withMessage('Address line must be a string'),

  check('address.city')
    .notEmpty()
    .withMessage('City is required')
    .isString()
    .withMessage('City must be a string'),

  check('address.province')
    .notEmpty()
    .withMessage('Province is required')
    .isString()
    .withMessage('Province must be a string'),

  check('address.country')
    .notEmpty()
    .withMessage('Country is required')
    .isString()
  
    .withMessage('Country must be a string'),

  check('qualification.passingYear')
    .notEmpty()
    .withMessage('Passing Year is required')
    .isString()
    .withMessage('Passing Year must be a string'),

  check('qualification.principle')
    .notEmpty()
    .withMessage('Principle is required')
    .isString()
    .withMessage('Principle must be a string'),

  check('qualification.school')
    .notEmpty()
    .withMessage('School is required')
    .isString()
    .withMessage('School must be a string'),

  check('enrollmentType')
    .notEmpty()
    .withMessage('Enrollment Type is required')
    .isString()
    .withMessage('Enrollment Type must be a string'),
];

