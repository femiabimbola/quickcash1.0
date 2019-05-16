
import expressvalid from 'validator';

class Auth {
  static validSignup(req, res, next) {
    const {
      password, email, firstName, lastName,
    } = req.body;
    let letters = /^[0-9a-zA-Z]+$/;

    if (typeof password !== 'string') {
      return res.status(200).send({
        error: 'password is a give ',
      }); 
    }


    // if (!expressvalid.isAlphanumeric(password)) {
    //   return res.status(200).send({
    //     error: 'password error',
    //   });
    // }
    next();
  }
}

export default Auth;
