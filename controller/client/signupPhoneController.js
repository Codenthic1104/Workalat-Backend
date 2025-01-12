
let ClientsData = require("../../models/Client");
let sendOtpVerificationPhoneWithoutId = require("../../middleware/sendOtpVerificationPhoneWithoutId");


async function signupPhoneController(req, res){
    try{        
        let phoneNo = req.body.phoneNo;
        let country = req.body.country; 
        let countryCode = req.body.countryCode;

        if((phoneNo ===null || phoneNo === undefined) || (country ===null || country === undefined) || (countryCode ===null || countryCode === undefined)){
            throw new Error("Please enter valide details.")
        }
        else{
            let data = await ClientsData.find({clientPhoneNo : phoneNo}); //If the phone no is already present we will not create the account.
            console.log(data);
            if(data.length>0){
                throw new Error("This Phone Number is already registered, please use another Phone Number");
            }
            else{
                // let dates ={
                //     passwordLast: Date.now(),
                //     twoFactAuthLast : Date.now(),
                //     kycLast: Date.now(),
                //     phoneLast: Date.now()
 
                // }
                // let data = await ClientsData.create({clientPhoneNo : phoneNo, registerAs :"client",clientCountry : country, clientCountryCode : countryCode, clientRegisterationType : "phone", ChangingDates: dates});
                // if(data.isClientPhoneNoVerify === true || data.isClientPhoneNoVerify){
                //     res.status(200).json({status : "success", message : "Account has been created successfully", data:[{
                //         userId : data._id, 
                //         isClientPhoneNoVerify : data.isClientPhoneNoVerify,
                //         isClientEmailVerify : data.isClientEmailVerify,
                //         clientDashAccess : data.clientDashAccess,
                //         clientPostingAccess : data.clientPostingAccess,
                //         adminAccessClient: data.adminAccessClient,
                //     }]})
                // }
                // else{
                    //Phone no verification process
                    let phone = phoneNo;
                    console.log(phone);
                    sendOtpVerificationPhoneWithoutId(phone, res)
                    // res.status(200).json({status : "success", message : "Account has been created successfully", data : [{
                    //     userId : data._id,
                    //     isClientPhoneNoVerify : data.isClientPhoneNoVerify,
                    //     isClientEmailVerify : data.isClientEmailVerify,
                    // }]})
                // }
            }  
        }
       
    }
    catch(e){
        console.log("Error while creating account using phone number during project posting", e);
        res.status(400).json({status : "fail", message : e.message});
    }
}


module.exports = signupPhoneController;