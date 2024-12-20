let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function signupGoogleController(req, res){
    try{
        let userFName = req.body.userFName;
        let userLName = req.body.userLName;
        let userFullName = req.body.userFullName;
        let userEmail = req.body.userEmail;
        let userPictureLink = req.body.userPictureLink;
        let userType = req.body.userType;
        let professionalService = req.body.professionalService;
        console.log(req.body);
        if(userType === "client"){ //If the type = client , then we will search in client's database , else in profesisonal database
            let data = await ClientsData.findOne({clientEmail: userEmail});
             console.log(data);
            if(data === null ){ 
                 let clientDataCreation = await ClientsData.create({
                    clientFName : userFName,
                    clientLName : userLName,
                    clientFullName : userFullName,
                    clientEmail : userEmail,
                    isClientEmailVerify : true,
                    clientPictureLink : userPictureLink,
                    isClientPicture : true,
                    clientRegisterationType : "google",
                    registerAs : "client"

                });
                let token = await clientDataCreation.generateAuthToken();
                res.status(200).json({status : "success", userStatus : "SUCCESS", userId : clientDataCreation._id , userType : "client",message : "Account creation Successfull.", id: clientDataCreation._id , token: token})
            }
            else{
                throw Error("This email already exists, please use another email or login.");     
            }
        }
        else{
            let data = await ProfessionalsData.findOne({professionalEmail: userEmail});
            console.log(data);
            if(data === null ){ 
                let professionalDataCreation = await ProfessionalsData.create({
                    professionalFName : userFName,
                    professionalLName : userLName,
                    professionalFullName : userFullName,
                    professionalEmail : userEmail,
                    isprofessionalEmailVerify : true,
                    professionalPictureLink : userPictureLink,
                    isprofessionalPicture : true,
                    professionalRegisterationType : "google",
                    registerAs : "professional",
                    professionalPrimaryService : professionalService

                });
                let token = await professionalDataCreation.generateAuthToken();
                res.status(200).json({status : "success", userStatus : "SUCCESS",  userId : professionalDataCreation._id , userType : "professional" ,message : "Account creation Successfull.", id : professionalDataCreation._id ,token: token, })
            }
            else{
                throw Error("This email already exists, please use another email or login.");     
            }

        }
    }
    catch(e){
        console.log("Error while Creating account using Gmail", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});

    }
};


module.exports = signupGoogleController;