
const bcrypt=require('bcrypt');
const People = require('../models/Pepoles');

function getUsersPage(req,res,next){
    res.render("users")
}
async function addUser(req,res,next){
let newUser;
const hashedPw=await bcrypt.hash(req.body.password,10);
if(req.files && req.files.length>0){
    newUser= new People({
        ...req.body,
        profile_image:req.files[0].filename,
        password:hashedPw
    });
}else{
    newUser= new People({
        ...req.body,
        password:hashedPw
    });
}

try{
    const result = await newUser.save();
    res.status(200).json({
        message:"User was added successfully!"
    });
}catch (err){
    res.status(500).json({
        errors:{
            common:{
                err:err.message
            }
        }
    });
}


}
module.exports={
    getUsersPage,
    addUser
  
}