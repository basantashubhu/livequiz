const router = require('express').Router()
const {Kernel} = require('../../app/Http/Controllers/Kernel/Kernel')
const {body, check} = require('express-validator')
const {exists, unique} = require('../../app/Validations/exists')

router.post('/v1/user/register', [
    body('first_name').exists({checkFalsy : true}).withMessage('First name field is required'),
    body('last_name').exists({checkFalsy : true}).withMessage('Last name field is required'),
    body('email').normalizeEmail().isEmail().withMessage('Valid email address required'),
    unique('email', 'User', 'email'),
    body('password').isLength({min:6}).withMessage('Password must contain at least 6 characters'),
], Kernel.map('ApiUserResourceController@register'))

router.post('/v1/user/authenticate', [
    body('email').normalizeEmail().isEmail().withMessage('Valid email address required'),
    exists('email', 'User', 'email'),
    body('password').isLength({min:6}).withMessage('Password must contain at least 6 characters')
], Kernel.map('ApiUserResourceController@authenticate'))

router.post('/v1/token', Kernel.map('ApiUserResourceController@validateToken'))


/*
* Verify email
* */
router.get('/v1/email/confirm', [
    check('email', 'Provide valid email address').exists().bail().normalizeEmail().isEmail(),
    check('code', 'Code must have 4 numbers').exists().bail()
    .isLength({min:4}).bail().isNumeric()
], Kernel.map('ApiUserResourceController@veryEmail'))

/*
* reset password route
* */
router.post('/v1/reset/password', [
    body('email').normalizeEmail().isEmail().withMessage('Provide valid email address'),
    exists('email', 'User', 'email')
], Kernel.map('ApiResetPasswordController@reset'))
router.post('/v1/password/reset', [
    exists('token', 'User', 'token'),
    body('password').isLength({min:6}).withMessage('Password must have at least 6 characters')
], Kernel.map('ApiResetPasswordController@resetPassword'))


module.exports = router