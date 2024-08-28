const express = require("express");
const fileUpload = require('express-fileupload');

const app = express();



require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


const user  =  require('./routes/authRoute');
const file  =  require('./routes/fileRoute')

app.use('/api/v1' , user)
app.use('/api/v1', file)


app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
})


const dbConnect = require('./config/database')

dbConnect();

const cloudinaryconnect =  require('./config/cloudniary');
cloudinaryconnect();