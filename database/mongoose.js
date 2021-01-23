const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://basanta:basanta44@livequiz.y6xdd.mongodb.net/livequiz', {
    useUnifiedTopology : true,
    useNewUrlParser : true
}).then(conn => {
    console.log('mongo db connection started');
})