import express from 'express'
import User from '../models/userModel'
import { getToken } from '../util';

const router = express.Router()


router.post('/signin', async (req, res) => {
  try{
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
    } else {
      res.status(401).send({ message: 'Senha ou Email invalido' });
    }
  }catch(error){
    console.log(error)
  }
  });



router.get("/createadmin", async (req, res) => {
    try{
        
    const user = new User({
        name: 'yep',
        email: 'yep@gmail.com',
        password: '123',
        isAdmin: true
    })

    const newUser = await user.save();
    res.send(user);
    
}catch(err){
    res.send({ msg: err.message})
}
})

export default router