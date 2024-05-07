const express= require('express')
const {getInboxPage}= require('../controller/inbox')
const HtmlResponse= require('../middliewares/htmlResponse')

const router = express.Router()

router.get("/",HtmlResponse('Inbox'),getInboxPage)

module.exports=router;