const JWT = require('jsonwebtoken');
const user = require('../models/user');

require('dotenv').config();


exports.auth =  async(req, res , next)=>{
      try{
            
               const{token} = req.body ; 
               
               if(!token)
               {
                return res.status(400).json({
                    success:false ,
                    message:"please fill  the  details "
                })
               }


               try{
                     const decode  =  JWT.verify(token , process.env.JWT_SECRET)

                     req.user  =  decode;
               }
               catch(error)
               {     
                  return res.status(400).json({
                    success:false ,
                    message:"token is invalid "
                   })

               }

               next();

      }
      catch(err){

        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"failed to authentication",
            message:err.message,
        })

      }
}


exports.isStudent = async(req,res , next)=>{
       try{
          
               if(req.user.role !== 'student')
               {    
                return res.status(400).json({
                    success:false ,
                    message:"this is protected route for student "
                })
                     
               }
               next();
              

       }
       catch(err){

        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"failed to autherize as student",
            message:err.message,
        })

      }
}




exports.isTeacher = async(req,res , next)=>{
    try{
       
            if(req.user.role !== 'teacher')
            {    
             return res.status(400).json({
                 success:false ,
                 message:"this is protected route for teacher "
             })
                  
            }
            next();
           

    }
    catch(err){

     console.error(err);
     console.log(err);
     res.status(500)
     .json({
         success:false,
         data:"failed to autherize as teacher",
         message:err.message,
     })

   }
}



