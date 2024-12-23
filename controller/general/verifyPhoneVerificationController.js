const sendOtpVerificationPhone = require("../../middleware/sendOtpVerificationPhone");
let verification = require("../../middleware/verification");
let ClientsData= require ("../../models/Client");
const { parsePhoneNumber } = require('libphonenumber-js');
const countries = require('i18n-iso-countries');
let ProfessionalsData = require("../../models/Professional");

async function verifyPhoneVerificationController(req, res){
    try{
        // let {token, userType} = req.body;
        let userType = req.body.userType;
        let userId = req.body.userId;
        let phoneNo= req.body.phoneNo;
        console.log(req.body);
        console.log("Yes this page");
         
            if(userType === "client"){
                console.log("Checking client")
               let find = await ClientsData.find({clientPhoneNo :phoneNo}).countDocuments();
               console.log("Phone number found", find)
               if(find < 1){ 
                let addClient = await ClientsData.findOne({_id : userId});
                if(addClient === null){
                    throw new Error("No user found, please login again.")
                } 
                else{

                    const phoneDetails = parsePhoneNumber(phoneNo);
                    if (phoneDetails && phoneDetails.country) {
                        const isoCountryCode = phoneDetails.country; // ISO country code (e.g., 'US', 'GB')
                        
                        // Map ISO code to full country name
                        const countryName = countries.getName(isoCountryCode, 'en'); // 'en' for English names
            
                        if (countryName) {
                    
                            addClient.clientPhoneNo = phoneNo;
                            addClient.isClientPhoneNoVerify = false;
                            addClient.clientCountry = countryName;
                            addClient.ChangingDates[0].phoneLast = Date.now();
                            await addClient.save();
                            sendOtpVerificationPhone(userId, phoneNo, res)

                        } else {
                            throw new Error(`Country name not found for ISO code: ${isoCountryCode}`);
                        }
                    } else {
                        throw new Error('Invalid phone number or country code not detected');
                    }
                }
               }
               else{
                let verify = await ClientsData.findOne({$and : [{_id : userId}, {clientPhoneNo :phoneNo }]})
                if(verify !== null){
                    const phoneDetails = parsePhoneNumber(phoneNo);
                    if (phoneDetails && phoneDetails.country) {
                        const isoCountryCode = phoneDetails.country; // ISO country code (e.g., 'US', 'GB')
                        // Map ISO code to full country name
                        const countryName = countries.getName(isoCountryCode, 'en'); // 'en' for English names
            
                        if (countryName) {
                            verify.clientCountry = countryName;
                            await verify.save();
                            sendOtpVerificationPhone(userId, phoneNo, res)
                        } else {
                            throw new Error(`Country name not found for ISO code: ${isoCountryCode}`);
                        }
                    } else {
                        throw new Error('Invalid phone number or country code not detected');
                    }
                }
                else{
                    throw new Error("This number is already in use by another user.")
                }
               }
            }
            else{
                console.log(phoneNo)

                let find = await ProfessionalsData.find({professionalPhoneNo :phoneNo}).countDocuments();
                if(find < 1){ 
                 let addClient = await ProfessionalsData.findOne({_id : userId});
                 if(addClient === null){
                     throw new Error("No user found, please login again.")
                 }
                 else{
                    const phoneDetails = parsePhoneNumber(phoneNo);
                if (phoneDetails && phoneDetails.country) {
                    const isoCountryCode = phoneDetails.country; // ISO country code (e.g., 'US', 'GB')
                    console.log(isoCountryCode)
                    // Map ISO code to full country name
                    const countryName = countries.getName(isoCountryCode, 'en'); // 'en' for English names
        
                    console.log(countryName)
                    if (countryName) {
                        addClient.professionalPhoneNo = phoneNo;
                        addClient.isprofessionalPhoneNoVerify = false;
                        addClient.professionalCountry = countryName
                        addClient.ChangingDates[0].phoneLast = Date.now();
                        console.log("Now saving ")
                        await addClient.save();
                        sendOtpVerificationPhone(userId, phoneNo, res)
                    } else {
                        throw new Error(`Country name not found for ISO code: ${isoCountryCode}`);
                    }
                } else {
                    throw new Error('Invalid phone number or country code not detected');
                }
                 }
                }
                else{
                    let verify = await ProfessionalsData.findOne({$and : [{_id : userId}, {professionalPhoneNo :phoneNo }]})
                 if(verify !== null){
                    const phoneDetails = parsePhoneNumber(phoneNo);
                    if (phoneDetails && phoneDetails.country) {
                        const isoCountryCode = phoneDetails.country; // ISO country code (e.g., 'US', 'GB')
                        // Map ISO code to full country name
                        const countryName = countries.getName(isoCountryCode, 'en'); // 'en' for English names
            
                        if (countryName) {
                            verify.professionalCountry = countryName;
                            await verify.save();
                            sendOtpVerificationPhone(userId, phoneNo, res)
                        } else {
                            throw new Error(`Country name not found for ISO code: ${isoCountryCode}`);
                        }
                    } else {
                        throw new Error('Invalid phone number or country code not detected');
                    }
                 }
                 else{
                     throw new Error("This number is already in use by another user.")
                 }
                }
            }
    }
    catch(e){
        console.log("Error Verifying user phone no.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = verifyPhoneVerificationController;