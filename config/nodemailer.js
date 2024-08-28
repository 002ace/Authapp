const nodemailer = require('nodemailer') ;
require('dotenv').config()



const sendMail =   async(doc) =>{
       try{
            let  transporter  =  nodemailer.createTransport({

                   host:process.env.MAIL_HOST,
                   auth:{
                       user:process.env.MAIL_USER,
                       pass:process.env.MAIL_PASSWORD
                   }

            })


            let info =  await transporter.sendMail({
                   from:"akatsuki",
                   to:doc.email,
                   subject:"regarding joining",
                   html:`<h1>success fully joined akatsuki</h1> <a href=${doc.imageUrl}> view herre${doc.imageUrl} </a> `
            })

            console.log(info);
       }
       catch(error)
       {
            console.log(error)
       }
}


module.exports = sendMail;