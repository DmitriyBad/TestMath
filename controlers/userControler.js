const User = require('../Models/users.js');

const {secret} = require('../configs.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passfather = require('passfather');
const mailer = require('../nodemailer.js')


const generateAcessToken = (id) => {
  const payload = {id};
  return jwt.sign(payload, secret, {expiresIn: "24h"});
};

class userController {

  async registration( req, res)  {
    
    try {

      console.log(req.body);
      const {username, password, mail} = req.body;

      //https://www.npmjs.com/package/express-validation добавити
      console.log("mail - " + mail);
      if (!username) {
        return res.status(400).json('User name empty!!!');
      }

      if (!password) {
        return res.status(400).json('Password empty!!!');
      }

      if (!mail) {
        return res.status(400).json('Mail empty!!!');
      }

      const user = await User.findOne({username});
      if (user) {
        return res.status(409).json(`User with name - ${username} is in base, please enter else name!` );
      }

      const mailFound = await User.findOne({mail});//емейл 
      if (mailFound) {
        return res.status(409).json(`User with mail - ${mail} is in base!` );
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const newUser = new User({username, password: hashPassword, mail});
      newUser.save();
      return res.status(201).json('User has been created succesfully!');//каряво
      
    } catch (error) {
      
      console.log(error);
      res.status(500).json({message: error});
    }
  }

  async login( req, res)  {

    try {
      
      const {mail, password} = req.body;

      if (!mail) {
        return res.status(400).json(`Mail is empy`);
      };

      if (!password) {
        return res.status(400).json(`Password is empy`);
      };

      const filter = { 'mail': mail };
      const user = await User.findOne(filter);
      if (!user) {
        return res.status(400).json(`Not find mail ${mail}`);
      };

      const isPasswordValid = bcrypt.compareSync(password, user.password); 

      console.log(isPasswordValid);
      
      if (!isPasswordValid) {
        return res.status(400).json('Password wrong, please enter again!');
      };
      
      const token = generateAcessToken(user._id);
      return res.status(201).json({token});
     
    } catch (error) {
      
      console.log(error);
      return res.status(500).json({message: 'Error - ' + error});
    }
  }

  async loginRecovery( req, res)  {

    try {
      
      const {mail} = req.body;
      const newPassword = passfather();

      console.log(newPassword);
      const hash = bcrypt.hashSync(newPassword, 7);

      const filter = { 'mail': mail };
      const update = { 'password': hash};
      const user = await User.updateOne(filter, update, { new: true });
      if (!user) {
        return res.status(400).json(`Not find mail ${mail}`);
      };

      const message = {
        
        to: mail,
        subject: 'New password',
        html: `New password <i>${newPassword}</i>`       
      }
      mailer(message);

      return res.status(200).json({newPassword});

    } catch (error) {
      
      console.log(error);
      return res.status(400).json({message: 'Erorre - ' + error});
    }
  }
  
  async getuser( req, res)  {

    try {
      
      console.log(User);
      const user = await User.find();
      return res.status(200).json(user);
      
    } catch (error) {
      
      console.log(error);
      return res.status(400).json({message: 'Erorre - ' + error});
    }
  }
};

module.exports = new userController();