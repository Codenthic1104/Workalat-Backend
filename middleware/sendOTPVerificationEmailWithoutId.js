let nodemailer = require("nodemailer");
let bcrypt = require("bcryptjs");
let OtpVerificationData = require("../models/OtpVerification");
let otpTheme = require("../components/email-themes/otpTheme")


let transporter = nodemailer.createTransport({
    host : process.env.HOST,
    auth : {
        user : process.env.USER,
        pass : process.env.PASS
    } 
}); 
transporter.verify((e, success)=>{
    if(e){
        console.log("Nodemailer Error : "  ,e)
    }
    else{
        console.log("Nodemailer is all set to send the emails");
    }
}); 

//Nodemailer Email OTP Sending Function
async function sendOtpVerificationEmail({email, userType,verificationType, verificationFor, accountCreation}, res){
    try{
        console.log("Called otp function");
        console.log(process.env.USER);
        let otp = `${Math.floor(1000+Math.random()*9000)}`;
        console.log(otp);
 
        //Mail Option
        let mailOption={
            from : process.env.USER,
            to : email,
            subject : "Verify Workalot Account.",
            html: otpTheme({otp}) 
        }

        //hash the otp
        let hashedOtp = await bcrypt.hash(otp, 10);
        console.log(hashedOtp)
        let newOtpVerification = await new OtpVerificationData({
            email: email,
            otp: hashedOtp,
            verificationType : verificationType,
            verificationFor : verificationFor,
            createdAt: Date.now(),
            expiredAt : Date.now()+ 5 * 60 * 1000

        });
        console.log(newOtpVerification);
        await newOtpVerification.save();
        await transporter.sendMail(mailOption);
        res.status(200).json({
            status: "success",
            userStatus : "PENDING",
            message : "OTP Sent on your Email.",
            emailVerified : false,
            data: [{
                verificationId : newOtpVerification._id,
                userType: userType,
                email
            }]
        })
    }
    catch(e){
        console.log("Error while sending Email for OTP verification", e);

        res.status(400).json({
            status : "FAILED",
            message : e.message,
            errorKey : e.key,
            data : [{
                userType: userType,
                email : email
            }]
        })
    }
};

module.exports = sendOtpVerificationEmail;