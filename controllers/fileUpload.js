const File  = require('../models/files');
const cloudinary = require('cloudinary').v2; 
exports.fileUpload  =  async(req,res)=>{
     try{

            const {file} =  req.files;

            // console.log(file);

            const path  = __dirname + '/files/' + Date.now()+ `.${file.name.split('.')[1]}`

            file.mv(path , (error)=>{
                //   console.log("error while uploading");
                  console.log(error)
            })


            res.json({

                  success:true,
                  message:"fileupload successfully"

            })

     }
     catch(err)
     {   
      console.error(err);
      console.log(err);
      res.status(500)
      .json({
          success:false,
          data:"failed to upload",
          message:err.message,
      })

     }
}


//  ---- image file upload --- 

async function uploadFileToCloudinary(file ,folder)
{   
       const option =  {folder};
       option.resource_type = "auto";
       return await cloudinary.uploader.upload(file.tempFilePath , option)

}

exports.image = async(req, res)=>{
    try{  
           const{name , imageUrl , tag , email} =  req.body;

           const {file} = req.files;

           const supportedType  =  ['jpg' , 'jpeg' , 'png'];

           const type  =  file.name.split('.')[1].toLowerCase();

           const fileSupported =  supportedType.includes(type);


           if(!fileSupported)
           {
               res.json({

                success:false,
                message:"file  type not supported"

              })
           }

           const response  =  await uploadFileToCloudinary(file , "newFolder")

        //    console.log(response)

           const data =  await File.create({
                 name , tag , email , imageUrl: response.secure_url
           })

           res.status(200).json({
                 success:true,
                 data:data,
                 meassage:"image uploade to cloudinary successfully"

           })
           
          
    }
    catch(err)
    {   
     console.error(err);
     console.log(err);
     res.status(500)
     .json({
         success:false,
         data:"failed to upload  image",
         message:err.message,
     })

    }
}


//-----video upload

exports.video = async(req,res)  =>{

    try{  
        const{name , imageUrl , tag , email} =  req.body;

        const {file} = req.files;

        const supportedType  =  ['mp4' , 'mp3'];

        const type  =  file.name.split('.')[1].toLowerCase();

        const fileSupported =  supportedType.includes(type);


        if(!fileSupported)
        {
            res.json({

             success:false,
             message:"file  type not supported"

           })
        }

        const response  =  await uploadFileToCloudinary(file , "newFolder")

     //    console.log(response)

        const data =  await File.create({
              name , tag , email , imageUrl: response.secure_url
        })

        res.status(200).json({
              success:true,
              data:data,
              meassage:"video uploade to cloudinary successfully"

        })
        
       
    }
      catch(err)
    {   
       console.error(err);
       console.log(err);
        res.status(500)
      .json({
             success:false,
         data:"failed to upload video",
         message:err.message,
        })

 }
      
}


