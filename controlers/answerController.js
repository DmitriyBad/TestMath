const answers = require('../Models/ResultTest.js');
const User = require('../Models/users.js');
const jwt = require('jsonwebtoken');
const {secret} = require('../configs.js');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class answerController {

  async writeAnswer(req, res) {

    try {
      
      const getAnswer = req.body;
      const token = req.headers.authorization;

       if (!token) {
        
        return res.status(400).json("token error");
      }
      const decoded = jwt.verify(token, secret);
      
      const idUser = decoded.id;

      for (let char of getAnswer) {
        char.user_id = idUser; // 𝒳, а затем 😂
      };

      answers.insertMany(req.body);
      return res.status(201).json("Answer register");

    } catch (error) {
      
      console.log(error);
      res.status(400).json(error);
    }
  };

  async getAllAnswer(req, res) {

    try {
            
      const answer = await answers.find();
            
      return res.status(200).json(answer);
    } catch (error) {
      
      console.log(error);
      res.status(400).json(error);
    }
  };

  async getAnswerUser(req, res) {

    try {
      
      const token = req.headers.authorization;

      if (!token) {
        
        return res.status(400).json("token error");
      }
      const decoded = jwt.verify(token, secret);
      
      const idUser = decoded.id;

      const filter = {'user_id':idUser};
      const answersUser = await answers.find(filter);

      console.log(answersUser);

      return res.status(200).json(answersUser);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };  

  async downloadFileAnswerUser(req, res) {

    try {
      
      const token = req.headers.authorization;      
      //console.log(req);

      if (!token) {
        
        return res.status(400).json("token error");
      }
      const decoded = jwt.verify(token, secret);
      
      const idUser = decoded.id;

      const filter = {'user_id':idUser};
      const answersUser = await answers.find(filter);
      let d = new Date;
     
      let filePath = __dirname + "/public/" + d.getFullYear() + d.getMonth() + d.getDay() + d.getHours() + d.getMinutes() + "_" + idUser;
     
      console.log(d);

      if (req.query.format=='csv') {
      
        filePath = filePath + "_usersfile.csv";
        const csvWriter = createCsvWriter({
          path: filePath,
          header: [
              {id: 'numberTest', title: 'numberTest'},
              {id: 'DateTest', title: 'DateTest'},
              {id: 'question', title: 'question'},
              {id: 'answer', title: 'answer'},
              {id: 'result', title: 'result'}
          ]
          });
      
          await csvWriter.writeRecords(answersUser)       // returns a promise
              .then(() => {
                  console.log('...Done');
              });
      
      } else {

        filePath = filePath + "_usersfile.json";
        fs.writeFileSync(filePath, JSON.stringify(answersUser));  
      }
            
      console.log(filePath);
      return res.sendFile(filePath);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };  
};

module.exports = new answerController();