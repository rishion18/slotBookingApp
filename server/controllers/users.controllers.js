import bcrypt from 'bcryptjs';
import users from '../models/users.models.js';

export const userRegister = async(req , res) => {
   try{
     const userData = req.body;
     userData.password = await bcrypt.hash(userData.password , 10);
     await users.create(userData);
     res.status(200).send({status: true , message:'successfully registered!'})
   }catch(e){
    res.status(500).send({status: false , message: e.message});
   }
}

export const userLogin = async(req , res) => {
    try{
      const {email , password , role} = req.body;
      const data = await users.findOne({email: email.toLowerCase()}).select('+password');
      if(!data || !(await bcrypt.compare(password , data.password))){
        res.status(401).send({status: false , message: 'invalid credentials'});
        return;
      }
      if(data.role !== role){
        res.status(401).send({status: false , message: 'invalid credentials'});
        return;
      }
      const jwtToken = await data.generateJWTToken();
      res.cookie('token', jwtToken, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
      res.status(200).send({ 
         status: true,
         message: 'Logged in successfully!' , 
         role:data.role,
         token: jwtToken
        });


    }catch(e){
        res.status(500).send({status: false , message: e.message});
    }
}

export const getUser = async(req , res) => {
   try{
    const {email} = req.body;
    const user = await users.findOne({email: email.toLowerCase()})
    if(user){
      res.status(200).send(user);
    }
   }catch(e){
    res.status(500).send(e.message)
   }
}