const {check, validationResult}=require('express-validator');
const createHttpError = require('http-errors');
const path = require('path');
const People = require('../../models/Pepoles');
const { unlink } = require('fs');


const addUserFormValidator=[
    check('name')
    .isLength({min:1}).withMessage('Name is required')
    .isAlpha("en-US",{ignore:" -"}).withMessage('This name is not valid')
    .trim(),

    check("email")
    .isEmail().withMessage("This email is not valid")
    .trim()
    .custom(async (value)=>{
        try{
           const user=await People.findOne({email:value});
           if(user){
            throw createHttpError('Email is already use!')
           }
        }catch(err){
            throw createHttpError(err.message)
        }
    }),


    check('mobile')
    .isMobilePhone('bn-BD',{
        strictMode:true
    }).withMessage("Only Bangladeshi number is allow starting with +880")
    .trim()
    .custom(async (value)=>{
        try{
            const user=await People.findOne({mobile:value});
            if(user){
             throw createHttpError('This mobile number is already use!')
            }
         }catch(err){
             throw createHttpError(err.message)
         }
    }),


    check('password')
    .isStrongPassword()
    .withMessage('Use some more strong password')
    .trim()
]



const formValidatorErrors=function(req,res,next){
    const errors= validationResult(req);
    const mappedErros=errors.mapped()
    if(Object.keys(mappedErros).length===0){
        next()
    }else{
        if(req.files.length>0){
            const {filename}=req.files[0];
            unlink(
                path.join(__dirname,`/../public/uploads/images/${filename}`),
                (err)=>{
                    if(err)console.log(err);
                }
            );
          
        }

        res.status(500).json({
            erros:mappedErros,
        })
    }
};

module.exports={
    addUserFormValidator,
    formValidatorErrors
}