const express= require('express')
const {getUsersPage}= require('../controller/users')
const HtmlResponse= require('../middliewares/htmlResponse')

const router = express.Router()

router.get("/",HtmlResponse('Users'),getUsersPage)

module.exports=router;