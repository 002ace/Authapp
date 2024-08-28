const express  =  require('express');

const router =  express.Router();


const{signUp , login} =  require('../controllers/auth');
const {auth , isStudent  , isTeacher} =  require('../middlewares/middle');


router.post('/signup'  ,  signUp);
router.post('/login' , login)

router.get('/student' , auth , isStudent , (req,res)=>{
      
       res.json({
            success:true,
            message:"welcme to protected route of student"
       })
        
      
})


router.get('/teacher' , auth , isTeacher , (req,res)=>{
      
    res.json({
         success:true,
         message:"welcme to protected route of teacher"
    })
     
   
})



module.exports = router ;