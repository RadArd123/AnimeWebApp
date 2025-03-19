
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const signupRoutes = require('./routes/signup');
const signinRoutes = require('./routes/signin');
const userRoutes = require('./routes/user');
const adminRoutes = require("./routes/isAdmin");
const animeRoutes = require("./routes/anime");
const commentsRoutes = require("./routes/comments");
const createAdminAccount = require('./scripts/admin');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use('/user', signupRoutes);
app.use('/auth', signinRoutes);
app.use('/api', userRoutes);
app.use('/admin', adminRoutes);
app.use('/api', animeRoutes);
app.use('/api', commentsRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});

