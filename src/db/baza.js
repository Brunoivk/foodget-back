const mongoose = require('mongoose');


//spajanje na bazu
mongoose.connect( 'mongodb+srv://admin:admin@cluster0.1pvmq.mongodb.net/foodget?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})





