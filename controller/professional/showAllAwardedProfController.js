let ClientsData = require("../../models/Client");
const ProjectsData = require("../../models/Project");

async function showAllAwardedProfController(req, res){
    try{
        let userId = req.body.userId;
        let data = await ProjectsData.find({$and : [{"proposals.professionalId" : userId},{ projectStatus: { $ne: 'completed' }}]}).select({
            professionalId : 1,
            ProjectId : 1,
            awardedStatus  : 1,
            serviceDes : 1, 
            serviceLocationPostal : 1,
            serviceLocationTown : 1,
            serviceTitle  : 1,
            projectTimeStamp  : 1, 
            projectStatusClient : 1,
            projectStatusAdmin : 1,
            projectStatusProfessional : 1,
            projectStatus : 1,
            serviceNeeded : 1,
            clientChatId : 1,
            clientName : 1,
            clientPictureLink : 1,
            clientId : 1,
            awardedProfessionalId  :1
        });  
        if(data.length < 1){
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: []});
        }
        else{
            let finalData = await Promise.all(data.map(async (val, i)=>{

                if(val.awardedStatus == "awarded" && val.projectStatus == "active"){
                    
                if(val.clientId.length > 0){

                    if(val.awardedProfessionalId == userId){
                        let professionalData = await ClientsData.findOne({_id : val.clientId}).select({
                            clientFullName : 1,
                            clientPictureLink : 1,
                        });
                        let updatedData = { ...val._doc }; // "_doc" is used to access the actual document
                        if(professionalData !== null){
                            updatedData.clientName = professionalData.clientFullName;
                            updatedData.clientPictureLink = professionalData.clientPictureLink;
                            return updatedData;
                        };
                    }
                }
                }
                else if(val.awardedStatus == "unawarded" && val.projectStatus == "active"){
                    let professionalData = await ClientsData.findOne({_id : val.clientId}).select({
                        clientFullName : 1,
                        clientPictureLink : 1,
                    });
                    let updatedData = { ...val._doc }; // "_doc" is used to access the actual document
                    if(professionalData !== null){
                        updatedData.clientName = professionalData.clientFullName;
                        updatedData.clientPictureLink = professionalData.clientPictureLink;
                        return updatedData;
                    };
                    return(val);
                }

        }));
                res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: finalData });
            
        }
    }
    catch(e){
        // console.log("Error while adding fetching propsals data", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showAllAwardedProfController;