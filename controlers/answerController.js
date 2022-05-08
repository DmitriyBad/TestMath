const answers = require('../Models/ResultTest.js');
const User = require('../Models/users.js')

class answerController {

  async writeAnswer(req, res) {

    try {
      
      //const {}
      console.log(req.body);
      answers.insertMany(req.body);
      res.status(200).json("Answer register");

    } catch (error) {
      
      console.log(error);
      res.status(400).json(error);
    }
  };

  async getAnswer(req, res) {

    try {
            
      const answer = await answers.find();
            
      console.log('answer - ' + answer);
      return res.status(200).json(answer);
    } catch (error) {
      
      console.log(error);
      res.status(400).json(error);
    }
  };

  
};

module.exports = new answerController();