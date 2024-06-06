const uploader =require('../../miniTools/fileUPload')

function imagesUpload(req,res,next){

const upload= uploader( 
    //the uploader funtion call here with the peramiter
    "images",
    ['image/jpeg','image/jpg','image/png'],
    1000000,
    'Only upload an image not any others!'
);

// upload any call here not in route file
upload.any((req,res,(err)=>{
   
    if(err){
        res.status(500).json({
            errors:{
                image:{
                    message:'err.message'
                }
            }
        })
      
    }else{
     console.log('hello')
        // res.end('file uploaded')
        next()
    }
}))
}

module.exports=imagesUpload;