const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
let ProjectsData = require("../../models/Project");

async function getSingleProjectController(req, res){
    try{
        let projectId = req.body.projectId;
        let userId = req.body.userId;
        let need = req.body.need;  //details / proposals / files / tasklist / reviews
        let userType = req.body.userType;  //client / professional
        console.log(req.body);

        if(need === "details"){
            let projectsData;
            if(userType === "client"){
                projectsData= await ProjectsData.findOne({$and : [{_id : projectId}, {clientId :userId }]}).select({
                    awardedDetails : 1,
                    confirmedPrice : 1,
                    projectStatusProfessional : 1,
                    projectQuestions : 1,
                    projectStatusAdmin : 1,
                    awardedProfessionalId : 1,
                    serviceDes : 1,
                    projectQuestions : 1,
                    serviceTitle : 1,
                    awardedStatus : 1,
                    projectPriceTitle : 1
                });
            }
            else{
                projectsData= await ProjectsData.findOne({$and : [{_id : projectId}, {awardedProfessionalId :userId }]}).select({
                    awardedDetails : 1,
                    confirmedPrice : 1,
                    projectStatusProfessional : 1,
                    projectQuestions : 1,
                    projectStatusAdmin : 1,
                    clientId : 1,
                    projectStatusProfessional : 1,
                    serviceDes : 1,
                    projectQuestions : 1,
                    serviceTitle : 1,
                    awardedStatus : 1,
                    projectPriceTitle : 1
                });
            } 
            if(projectsData === null){
                throw new Error("No data Found")
            }
            else{
                if(projectsData.awardedStatus === "awarded"){
                    if(userType === "client"){
                    console.log("Yes here")
                    let professionalDetails = await ProfessionalsData.findOne({_id : projectsData.awardedProfessionalId}).select({
                        professionalFullName : 1,
                        professionalChatId : 1,
                        professionalEmail : 1,
                        professionalPictureLink : 1,
                        professionalPhoneNo : 1,
                        professionalCompanyName : 1,
                    });
                    let data = {
                        projectDes : projectsData.serviceDes,
                        projectTitle : projectsData.serviceTitle,
                        awardedStatus : projectsData.awardedStatus,
                        awardedProfessionalId : projectsData.awardedProfessionalId,
                        projectQuestions : projectsData.projectQuestions,
                        projectPrice : projectsData.confirmedPrice,
                        projectPriceTitle : projectsData.projectPriceTitle,
                        _id : projectsData._id,
                        serviceTitle : projectsData.serviceTitle,
                        professionalDetails : [professionalDetails]
                    }
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: data});
                    }
                    else{
                        
                    let clientDetails = await ClientsData.findOne({_id : projectsData.clientId}).select({
                        clientFullName : 1,
                        clientChatId : 1,
                        clientEmail : 1,
                        clientPictureLink : 1,
                        clientPhoneNo : 1
                    })
                    let data = {
                        projectDes : projectsData.serviceDes,
                        projectTitle : projectsData.serviceTitle,
                        awardedStatus : projectsData.awardedStatus,
                        awardedProfessionalId : projectsData.awardedProfessionalId,
                        projectQuestions : projectsData.projectQuestions,
                        projectPrice : projectsData.confirmedPrice,
                        projectPriceTitle : projectsData.projectPriceTitle,
                        _id : projectsData._id,
                        serviceTitle : projectsData.serviceTitle,
                        projectStatusProfessional : projectsData.projectStatusProfessional,
                        clientDetails : [clientDetails]
                    }
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: data});

                    }
                }
                else{
                    let data = {
                        projectDes : projectsData.serviceDes,
                        projectTitle : projectsData.serviceTitle,
                        awardedStatus : projectsData.awardedStatus,
                        awardedProfessionalId : projectsData.awardedProfessionalId,
                        projectQuestions : projectsData.projectQuestions,
                        projectPrice : projectsData.confirmedPrice,
                        projectPriceTitle : projectsData.projectPriceTitle,
                        _id : projectsData._id,
                        serviceTitle : projectsData.serviceTitle
                    }
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: data});
                }
               
            }

        }
        else if(need === "proposals"){
            if(userType === "client"){
                
                let projectsData= await ProjectsData.findOne({$and : [{_id : projectId}, {clientId :userId }]}).select({
                    proposals : 1,
                    awardedStatus : 1,
                    projectStatusClient : 1,
                    serviceNeeded : 1,
                    serviceLocationPostal : 1,
                    serviceLocationTown : 1,
                    serviceTitle : 1
                });
                // Convert the document to a plain object to allow modifications
                let projectsDataObj = projectsData.toObject();

                let finalData = await Promise.all(projectsDataObj.proposals.map(async (val, i)=>{
                        let professionalData = await ProfessionalsData.findOne({_id : val.professionalId}).select({
                            professionalCountry : 1, 
                        });
                        console.log("Professional Data", professionalData);
                        let updateData = { ...val._doc }; // "_doc" is used to access the actual document
                        if(professionalData !== null){
                            updateData.professionalCountry = professionalData.professionalCountry;
                        };
                        return {
                            ...val, // Retain original proposal properties
                            ...(professionalData && { professionalCountry: professionalData.professionalCountry }) // Add professionalCountry only if available
                        };
                    
                }));
                projectsDataObj.proposals = finalData;
                res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsDataObj});
            }
            else{
                
            let projectsData= await ProjectsData.findOne({$and : [{_id : projectId}, {"proposals.professionalId" :userId }]}).select({
                proposals : 1,
                awardedStatus : 1,
                projectStatusClient : 1,
                serviceNeeded : 1,
                serviceLocationPostal : 1,
                serviceLocationTown : 1,
                serviceTitle : 1
            });
            console.log(projectsData);
            // Convert the document to a plain object to allow modifications
            let projectsDataObj = projectsData.toObject();

            let finalData = await Promise.all(projectsDataObj.proposals.map(async (val, i)=>{
                    let professionalData = await ProfessionalsData.findOne({_id : val.professionalId}).select({
                        professionalCountry : 1, 
                    });
                    console.log("Professional Data", professionalData);
                    let updateData = { ...val._doc }; // "_doc" is used to access the actual document
                    if(professionalData !== null){
                        updateData.professionalCountry = professionalData.professionalCountry;
                    };
                    return {
                        ...val, // Retain original proposal properties
                        ...(professionalData && { professionalCountry: professionalData.professionalCountry }) // Add professionalCountry only if available
                    };
                
            }));
            projectsDataObj.proposals = finalData;
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsDataObj});

            }
        }
        else if(need === "files"){
            if(userType === "client"){
                
            let projectsData= await ProjectsData.findOne({$and : [{_id : projectId}, {clientId :userId }]}).select({
                projectFileURL : 1,
                serviceTitle : 1,
                projectStatusAdmin : 1,
        });
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsData});

            }
            else{
                
            let projectsData= await ProjectsData.findOne({$and : [{_id : projectId}, {awardedProfessionalId :userId }]}).select({
                projectFileURL : 1,
                serviceTitle : 1,
                projectStatusAdmin : 1,
        });
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsData});
            }
        }
        else if(need === "tasklist"){
            if(userType === "client"){
                let projectsData= await ProjectsData.findOne({$and : [{_id : projectId}, {clientId :userId }]}).select({
                    taskLists : 1,
                    serviceTitle : 1,
                    projectStatusAdmin : 1,
            });
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsData});

            }
            else{
                let projectsData= await ProjectsData.findOne({$and : [{_id : projectId}, {awardedProfessionalId :userId }]}).select({
                    taskLists : 1,
                    serviceTitle : 1,
                    projectStatusAdmin : 1,
            });
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsData});


            }
        }
        else if(need === "reviews"){
            if(userType === "client"){
                
            let projectsData= await ProjectsData.findOne({$and : [{_id : projectId}, {clientId :userId }]}).select({
                clientReview : 1,
                professionalReview : 1,
                awardedDetails : 1,
                serviceTitle :1
        });    
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsData});
            }
            else{
                
            let projectsData= await ProjectsData.findOne({$and : [{_id : projectId}, {awardedProfessionalId :userId }]}).select({
                clientReview : 1,
                professionalReview : 1,
                awardedDetails : 1,
                serviceTitle :1
        });    
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsData});

            }
        }
        else{
            throw new Error("Some Error occurred, Please Try Again");
        }   
    }
    catch(e){
        console.log("Error while fetching projects project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = getSingleProjectController;