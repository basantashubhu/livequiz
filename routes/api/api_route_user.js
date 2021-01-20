const router = require('express').Router()
const {Kernel} = require('../../app/Http/Controllers/Kernel/Kernel')

router.post('/v1/users/all', Kernel.map('ApiUserController@userAll'))

module.exports = router