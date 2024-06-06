const express= require('express')
const {getUsersPage,createUser, addUser}= require('../controller/users')
const HtmlResponse= require('../middliewares/htmlResponse')
const imagesUpload = require('../middliewares/uploadSystem/imagesUpload')
const { addUserFormValidator, formValidatorErrors } = require('../middliewares/formHandle/formValidator')

const router = express.Router()

router.get("/",HtmlResponse('Users'),getUsersPage)

router.post("/create", imagesUpload,addUserFormValidator,formValidatorErrors,addUser)

module.exports=router;