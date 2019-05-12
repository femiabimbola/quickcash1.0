// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import users from '../model/users';
// import verify from '../middlewares/authenticator';

class userController {
  static generateUser(req, res) {
    // To check if user exist
    const userexist = users.find(auser => auser.email === req.body.email);
    if (userexist) {
      return res.status(400).json({
        status: 401,
        error: 'User already exist',
      });
    }
    const newUser = {
      id: users.length + 1,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      // password: req.body.password, // harshpassword
      address: req.body.address,
      status: 'unverified',
      createdOn: moment().format('llll'),
      isAdmin: false,
    };
    return users.push(newUser);
  }

  static loginUser(req, res) {
    const userExist = users.find(user => user.email === req.body.email);
    if (!userExist) {
      return res.status(400).json({
        status: 401,
        error: 'No user Found',
      });
    }
    return res.status(200).json({
      status: 200,
      userName: userExist.firstName,
      lastName: userExist.lastName,
    });
  }

  static verifyUser(req, res) {
    const { email } = req.params;
    const auser = user.find(user => user.email === email);
    if (!auser) {
      return res.status(200).send({
        status: 404,
        error: 'No user found!',
      });
    }
    return res.status(200).json({
      status: 200,
      data: auser,
    });
  }
}
export default userController;
