const uploader =require('../../miniTools/fileUPload')

function imagesUpload(req,res,next){

const upload= uploader( //the uploader funtion call here with the peramiter
    "images",
    ['image/jpeg','image/jpg','image/png'],
    1000000,
    'Only upload an image not any others!'
);
upload.any((req,res,(err)=>{
    if(err){
        errors:{
            image:{
                message:err.message
            }
        }
    }else{
        res.end('file uploaded')

        next()
    }
}))
}

module.exports=imagesUpload;