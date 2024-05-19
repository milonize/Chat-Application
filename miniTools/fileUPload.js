const multer = require("multer");
const path = require("path");
const createHttpError = require("http-errors");

function uploader(folder_name,allow_file_type,file_size,error_message){
    
    const folderLoctions=`${__dirname}/../public/uploads/${folder_name}`
    //make storage object
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,folderLoctions);
        },
        filename:(req,file,cb)=>{
const extention=path.extname(file.originalname);
const fileName=file.originalname.replace(extention,"").toLowerCase().split(' ').join('-')+'-'+Date.now()
cb(null,fileName+extention)      

},
    })


    //make upload object
    const upload= multer({
        storage:storage,
        limits:{
            fileSize:file_size
        },
        fileFilter:(req,file,cb)=>{
            if(allow_file_type.includes(file.minetype)){
                cb(null,true)
            }else{
                cb(createHttpError(error_message))
            }
        }
    })
    
    
    return upload;

}

module.exports=uploader;