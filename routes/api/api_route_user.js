const router = require('express').Router()
const { body } = require('express-validator')
const {Kernel} = require('../../app/Http/Controllers/Kernel/Kernel')

router.post('/v1/users/all', Kernel.map('ApiUserController@userAll'))

router.patch('/v1/user/:id', [
], Kernel.map('ApiUserController@updateUser'))

module.exports = router