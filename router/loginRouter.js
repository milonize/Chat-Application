const express= require('express')
const {getLoginPage}= require('../controller/login')
const HtmlResponse= require('../middliewares/htmlResponse')
const router = express.Router()

router.get("/",HtmlResponse('Login'),getLoginPage)

module.exports=router;