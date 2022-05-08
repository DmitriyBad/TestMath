
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routers/userRouters.js');
const answerRouter = require('./routers/answerRouter.js');
const {URI_MONGO_DB} = require('./configs.js');
const passfather = require('passfather');
//const { error } = require("console");


const PORT = process.PORT || 5000;

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/answer', answerRouter);


const start = async () => {

  try {
   
    //await mongoose.connect('mongodb+srv://MathTest:MathTest@mathtest.2igtq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    await mongoose.connect(URI_MONGO_DB)
      .then(() => console.log('MongoDB connect.'))
      .catch(error => console.log(error));
    app.listen(PORT, ()=> {

      console.log(`Server work ` + PORT);
    });
  } 
  
  catch (error) {
    console.log(error);
  }
}

start();