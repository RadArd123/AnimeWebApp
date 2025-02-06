const  mongoose =  require('mongoose');

mongoose.connect("mongodb+srv://radu:radudb@cluster0.0cjib.mongodb.net/");

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});     

module.exports = mongoose;