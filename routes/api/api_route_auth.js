const router = require('express').Router()
const {Kernel} = require('../../app/Http/Controllers/Kernel/Kernel')
const {body} = require('express-validator')

router.post('/v1/user/register', [
    body('first_name').exists({checkFalsy : true}).withMessage('First name field is required'),
    body('last_name').exists({checkFalsy : true}).withMessage('Last name field is required'),
    body('email').normalizeEmail().isEmail().withMessage('Valid email address required'),
    body('password').isLength({min:6}).withMessage('Password must contain at least 6 characters'),
    body('confirmation_password').custom((cp, {req}) => req.body ? cp === req.body.password : false)
    .withMessage('Password confirmation did not match password'),
], Kernel.map('ApiUserResourceController@register'))

router.post('/v1/user/authenticate', [
    body('email').normalizeEmail().isEmail().withMessage('Valid email address required'),
    body('password').isLength({min:6}).withMessage('Password must contain at least 6 characters')
], Kernel.map('ApiUserResourceController@authenticate'))

module.exports = router