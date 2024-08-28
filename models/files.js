const mongoose  =  require('mongoose');


const fileSchema =  new  mongoose.Schema({
       name:{
             type:String,
             required:true,

       },
       imageUrl:{
              type:String,

       },
       tag:{
             type:String
           
       },
       email:{
             type:String
       }
})

 const sendMail =  require('../config/nodemailer')
fileSchema.post('save' , function(doc){
       sendMail(doc);
});


module.exports = mongoose.model('File' , fileSchema)