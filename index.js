const express = require ('express');
const mongoose = require ('mongoose');
const dotEnv = require ('dotenv');
const userRouter = require ('./router/userRouter');
const bodyparser = require ('body-parser');
const cors = require ('cors');
const addworkRouter = require ('./router/addworkRouter');
const multer = require('multer');
const path = require('path')

const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

dotEnv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch(()=>{
    console.error(error);
})

app.use(bodyparser.json());
app.use('/user',userRouter);
app.use('/work',addworkRouter);

app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`)
})

app.use('/',(req, res)=>{
    res.send("<h1> hello gowtham how are you </h1>")
})