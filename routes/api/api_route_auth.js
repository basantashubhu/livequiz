const router = require('express').Router()
const {Kernel} = require('../../app/Http/Controllers/Kernel/Kernel')
const {body} = require('express-validator')
const { User } = require('../../app/models/User')

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

router.post('/v1/token', Kernel.map('ApiUserResourceController@validateToken'))

module.exports = router