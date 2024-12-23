require("dotenv").config()
let jwt = require("jsonwebtoken");
const { config } = require("dotenv");


async function verificationAdmin({token}){
    console.log(token);
    try{
        let verifying=  jwt.verify(token, process.env.SECRET_KEY)
        console.log(verifying);
        let v =verifying._id;
        // console.log(v);
        if( v|| v !== undefined || v !==null ){
            return({verified: true, _id: v, adminType : verifying.admin_status})
        }
        else{
            return({verified: false, _id: ""})
        }
    }
    catch(e){
        console.log("Token Verifiyng Error", e)
        let ErrorFind= e.message.search("invalid token");
        console.log(e.message.search("invalid token"));
        if(ErrorFind === 0){
            return({verified: false, _id: ""})
        }
        else{
            return({verified: false, _id: ""})
        }
    }
};

module.exports = verificationAdmin;