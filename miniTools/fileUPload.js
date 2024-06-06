const multer = require("multer");
const path = require("path");
const createHttpError = require("http-errors");

function uploader(
    folder_name,
    allow_file_types,
    file_size,
    error_message
){

    const folderLocations = path.join(__dirname, '..', 'public', folder_name);
    console.log("Folder Location:", folderLocations);
  
    // Make storage object
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            console.log("Destination function called");
            cb(null, folderLocations); 
        },
        filename: (req, file, cb) => {
            console.log("Filename function called");
            const extension = path.extname(file.originalname);
            const fileName = file.originalname.replace(extension, "").toLowerCase().split(' ').join('-') + '-' + Date.now();
            cb(null, fileName + extension);
        },
    });

    // Make upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: file_size
        },
        fileFilter: (req, file, cb) => { 
            // Filter which file types are allowed
            console.log("File filter function called");
            if (allow_file_types.includes(file.mimetype.toLowerCase())) {
                cb(null, true); 
            } else {
                console.log("File type not allowed");
                cb(createHttpError(error_message));
            }
        }
    });

    return upload;
}

module.exports = uploader;
