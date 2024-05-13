const express= require('express')
const dotenv= require('dotenv')
const mongoose= require('mongoose')
const path= require('path')
const cookieParser= require('cookie-parser')

const{pageNotFound,errorHandler}=require('./middliewares/errorHandler')
const loginRouter=require('./router/loginRouter')
const usersRouter=require('./router/usersRouter')
const inboxRouter=require('./router/inboxRouter')

        const app=express()

        dotenv.config()

mongoose.connect(process.env.MONGO_CONNECTION_URL)
.then(()=>{
    console.log('Database connection successful')
})
.catch(err=>{
    console.log(err)
})


app.use(express.json())
app.use(express.urlencoded({
extended:true
}))


app.use('/',loginRouter)
app.use('/users',usersRouter)
app.use('/inbox',inboxRouter)





app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser(process.env.COOKIE_KEY))

app.use(pageNotFound);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log('application runing on port'+process.env.PORT)
})
