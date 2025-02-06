const express = require('express');
const bodyParser = require('body-parser');
const signupRoutes = require('./routes/signup');
const signinRoutes = require("./routes/signin");
const cors = require('cors');
const createAdminAccount = require('./scripts/admin');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use('/user', signupRoutes);
app.use("/auth", signinRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});