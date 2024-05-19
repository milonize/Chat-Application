const mongoose= require('mongoose')

const peopleSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,

    },
    mobile:{
        type:String,
        required:true,
        trim:true,

    },
    password:{
        type:String,
        required:true
    },
    profile_image:{
        type:String
    },
    role:{
        type:String,
        enum:['admin','users'],
        default:'user',
    },
 
},
{
    timestamps:true

}
)

const People = mongoose.model("People",peopleSchema) // this is the main variable

module.exports = People;