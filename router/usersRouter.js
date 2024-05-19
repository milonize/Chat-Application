const express= require('express')
const {getUsersPage,createUser}= require('../controller/users')
const HtmlResponse= require('../middliewares/htmlResponse')
const imagesUpload = require('../middliewares/uploadSystem/imagesUpload')
const { addUserFormValidator, formValidatorErrors } = require('../middliewares/formHandle/formValidator')

const router = express.Router()

router.get("/",HtmlResponse('Users'),getUsersPage)
router.post("/create", imagesUpload,addUserFormValidator,formValidatorErrors)

module.exports=router;