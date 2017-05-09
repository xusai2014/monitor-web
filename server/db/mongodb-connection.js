import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1/monitor');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log(`we're connected!`);
});
