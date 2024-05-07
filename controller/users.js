function getUsersPage(req,res,next){
    res.render("users",{
        tittle:'Users - Chat',
    })
}

module.exports={
    getUsersPage,
}