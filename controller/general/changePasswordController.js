let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let bcrypt = require("bcryptjs");

async function changePasswordController(req, res){
    let userType = req.body.userType;
    let userId = req.body.userId;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
 
    try{
        if(userType === "client"){
            let userData = await ClientsData.findOne({_id : userId}).select({clientPassword : 1, ChangingDates : 1 ,clientRegisterationType : 1});
            if(userData === null){
                res.status(400).json({status : "fail", userStatus : "FAIL", message : "No Data Found, please login again."});
            }
            else{
                    console.log(userData);
                    let verify = await bcrypt.compare(oldPassword, userData.clientPassword);
                    console.log(verify)    
                    if(verify === true || verify){
                        userData.clientPassword = newPassword;
                        userData.ChangingDates[0].passwordLast = Date.now();
                        await userData.save();
                        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Password changed Successfully"});
                    }
                    else{
                        throw new Error("Incorrect password, Please Enter Currect Password.")
                    }
            }
        }
        else{
            let userData = await ProfessionalsData.findOne({_id : userId}).select({professionalPassword : 1,professionalRegisterationType :1 , ChangingDates : 1});
                console.log(userData);
                let verify = await bcrypt.compare(oldPassword, userData.professionalPassword);
                console.log(verify)    
                if(verify === true || verify){
                    userData.professionalPassword = newPassword;
                    userData.ChangingDates[0].passwordLast = Date.now();
                    await userData.save();
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Password changed Successfully"});
                }
                else{
                    throw new Error("Incorrect password, Please Enter Currect Password.")
                }
        }

    }
    catch(e){
        console.log("Error while changing password of user. ", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = changePasswordController;