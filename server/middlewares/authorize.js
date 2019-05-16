import jwt from 'jsonwebtoken';
import entity from '../model/dummydb';

class authenticator {

  static generateAdminToken(id, email, isAdmin) {
    const token = jwt.sign({ id, email, isAdmin },
      process.env.SECRET_KEY, {
        expiresIn: '12h',
      });
    return token;
  }

  static generatePasswordToken (id, email, password) {
      const pToken = jwt.sign({id, email, password}, 
        process.env.SECRET_KEY,{
        expiresIn: '5 minutes',
    }
  }

  
}

export default authenticator;
