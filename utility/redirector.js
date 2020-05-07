// import User from '../models/user';
import {encrypt, decrypt} from './encryptor'


export function loggedInChecker(req, res){
    if(!req.session.hasOwnProperty("user_id")){
        return false
    }
    else if(req.session.hasOwnProperty("user_id")){
        return true
    }
}