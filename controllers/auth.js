const User = require('../models/user');

const bcrypt =  require('bcrypt');
const JWT = require('jsonwebtoken');
require('dotenv').config();


exports.signUp =  async(req,res)=>{
    {
           try{
                   const{name ,email , password , role} =  req.body;

                   const findEmail =  await  User.findOne({email});


                   if(findEmail)
                   {
                         return res.status(409).json({
                        success: false,
                        message: "User already exists",
                        });
                   }

                   let hashPassword 

                   try
                   {
                       hashPassword = await bcrypt.hash(password , 10);

                   }
                   catch(error)
                   {   
                        return res.status(500).json({
                        success: false,
                        message: "Error in hashing password",
                       });
                        
                   }


                   const user =  await User.create({
                      name , email , password:hashPassword , role
                   })


                   return res.status(201).json({
                    success: true,
                    data: user,
                    message: "User created successfully",
                });



           }
           catch(err)
           {   
            console.error(err);
            console.log(err);
            res.status(500)
            .json({
                success:false,
                data:"failed to signup",
                message:err.message,
            })

           }
    }
}




exports.login  = async(req,res)=>{
    try{

            const{email , password} =  req.body;

            if(!email || !password){
                  return res.status(400).json({
                      success:false ,
                      message:"please fill all the  details carefully"
                  })
            }

            let user =  await User.findOne({email});

            if(!user)
            {    
                return res.status(401).json({
                    success:false ,
                    message:"user does Not exist"
                })
                   
            }

            const payload =  {
                  email : user.email,
                  id : user.id,
                  role:user.role
            };

            if(await bcrypt.compare(password ,  user.password))
            {
                      let token  =  JWT.sign(payload , process.env.JWT_SECRET , {expiresIn : '2h'} );

                      user  =  user.toObject();
                      user.token = token ;

                      user.password = undefined

                      const option = {
                            expires : new Date( Date.now() + 3 *24 *60*60*1000),
                            httpOnly : true
                      }

                      res.cookie('token' , token , option).status(200).json({
                            success:true,
                            token,
                            user,
                            message:"user loged in successfully"
                      })
            }
            else
            {        
                return res.status(400).json({
                    success:false ,
                    message:"password didnot match"
                })
                  
            }


    }
    catch(err)
    {    
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"failed to signup",
            message:err.message,
        })

    }
}