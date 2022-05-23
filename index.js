
const express = require("express");
const mongoose = require("mongoose");
const passfather = require('passfather');
const userRouter = require('./routers/userRouters.js');
const answerRouter = require('./routers/answerRouter.js');
const {URI_MONGO_DB} = require('./configs.js');


const PORT = process.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.use('/user', userRouter);//auth
app.use('/answer', answerRouter);

const start = async () => {

  try {
   
    await mongoose.connect(URI_MONGO_DB)
      .then(() => console.log('MongoDB connect.'))
      .catch(error => console.log(error));
    app.listen(PORT, ()=> {

      console.log(`Server works ` + PORT);
    });
  } 
  
  catch (error) {
    console.log(error);
  }
}

start();

//перечитати рест арі Антон скидав
//перевірити неймінги переміних
// перевірити заметки які написані
// дубіл кода забарти
// подивитися https://www.npmjs.com/package/express-validation і валідацію начіпляти на роути
// також почитати express authorization
// як зафігачити тестові дані
//пагінація
//https://youtu.be/otrfSgeK3JI


// доробавити ще схему userdate, ПІБ, рік народження, Фото 