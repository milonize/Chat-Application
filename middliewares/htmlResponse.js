function HtmlResponse(page_title){
    return function(req,res,next){
        res.locals.html=true,
        res.locals.tittle=`${page_title}-${process.env.APP_NAME}`
        next()
    }
}

module.exports=HtmlResponse;