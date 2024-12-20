let ProfessionalsData = require("../../models/Professional");
let ProjectsData = require("../../models/Project");

async function showLeadsController(req, res) {
    try {
        let  userId  = req.body.userId;
        let choice = req.body.choice; //leads, dashboard

        // Fetch the professional's data
        let data = await ProfessionalsData.findOne({ _id: userId }).select({
            isprofessionalEmailVerify: 1, 
            isprofessionalPhoneNoVerify: 1,
            professionalServiceLocPostCodes: 1,
            // professionalServiceLocCity: 1,
            professionalServiceLocCountry: 1,
            professionalPrimaryService: 1,
            professionalAdditionalServices: 1,
            professionalSkills: 1,
            clientDashAccess: 1,
            professionalBio: 1,
            professionalDashAccess: 1,
            adminAccessProfessional: 1,
            proposals: 1 // Add proposals to select
        });
        // console.log(data.professionalSkills.length);
        if (!data) {
            throw new Error("Invalid Credentials, please login again");
        }
        // console.log(data.professionalServiceLocPostCodes.includes("nationwide"));

        let primaryServiceRegex = new RegExp(data.professionalPrimaryService, "i");
        let bioRegex = new RegExp(data.professionalBio, "i");
        let skillsRegexArray = data.professionalSkills.map(skill => new RegExp(`${skill}`, "i"));


        // Fetch projects that match the professional's profile
        let projects
        if(data.professionalServiceLocPostCodes.includes("nationwide")){
            if(data.professionalSkills.length>0){
                // console.log("Nationwide and skilles");
                projects = await ProjectsData.find({
                    $and: [
                        // Match based on primary service or bio relevance
                        {
                            $or: [
                                { serviceNeeded: { $regex: primaryServiceRegex } },
                                { serviceDes: { $regex: primaryServiceRegex } },
                                { serviceDes: { $regex: bioRegex } }
                            ]
                        },
                        {
                            $or: skillsRegexArray.map(skillRegex => ({
                                $or: [
                                    { serviceNeeded: { $regex: skillRegex } },
                                    { serviceDes: { $regex: skillRegex } }
                                ]
                            }))
                        },
                        { maxBid: { $gt: 0 } },
                        { projectStatusAdmin: true },
                        { awardedStatus: "unawarded" }
                    ]
                }).select({
                    clientId: 1,
                    clientName: 1,
                    clientCountry: 1,
                    serviceNeeded: 1,
                    serviceLocationPostal: 1, 
                    serviceLocationTown : 1,
                    serviceTitle: 1,
                    serviceDes: 1,
                    pointsNeeded: 1,
                    isClientEmailVerify : 1,
                    isClientPhoneNoVerify : 1,
                    projectTimeStamp: 1,
                    proposals : 1,
                    clientPictureLink: 1,
                    maxBid : 1,
                    projectMaxPrice : 1,
                    projectUrgentStatus : 1,
                    serviceLocationTown : 1
                });
            }
            else{
                // console.log("Nationwide and No skilles");
                projects = await ProjectsData.find({
                    $and: [
                        // Match based on primary service or bio relevance
                        {
                            $or: [
                                { serviceNeeded: { $regex: primaryServiceRegex } },
                                { serviceDes: { $regex: primaryServiceRegex } },
                                { serviceDes: { $regex: bioRegex } }
                            ]
                        },
                        // Filter other project criteria
                        { maxBid: { $gt: 0 } },
                        { projectStatusAdmin: true },
                        { awardedStatus: "unawarded" }
                    ]
                }).select({
                    clientId: 1,
                    clientName: 1,
                    clientCountry: 1,
                    serviceNeeded: 1,
                    serviceLocationPostal: 1, 
                    serviceLocationTown : 1,
                    serviceTitle: 1,
                    serviceDes: 1,
                    pointsNeeded: 1,
                    isClientEmailVerify : 1,
                    isClientPhoneNoVerify : 1,
                    projectTimeStamp: 1,
                    proposals : 1,
                    clientPictureLink: 1,
                    maxBid : 1,
                    projectMaxPrice : 1,
                    projectUrgentStatus : 1,
                    serviceLocationTown : 1
                });
                  
            }
        }
        else{
            if(data.professionalSkills.length>0){
                projects = await ProjectsData.find({
                    $and: [
                        // Match based on primary service or bio relevance
                        {
                            $or: [
                                { serviceNeeded: { $regex: primaryServiceRegex } },
                                { serviceDes: { $regex: primaryServiceRegex } },
                                { serviceDes: { $regex: bioRegex } }
                            ]
                         },
                        // Match based on professional skills with serviceNeeded or serviceDes using $or
                        {
                            $or: skillsRegexArray.map(skillRegex => ({
                                $or: [
                                    { serviceNeeded: { $regex :   skillRegex  } },
                                    { serviceDes: { $regex: skillRegex } }
                                ]
                            }))
                        },
                        // Match location based on postal codes
                        { serviceLocationPostal: { $in: data.professionalServiceLocPostCodes } },
                        // Filter other project criteria
                        { maxBid: { $gt: 0 } },
                        { projectStatusAdmin: true },
                        { awardedStatus: "unawarded" }
                    ]
                }).select({
                    clientId: 1,
                    clientName: 1,
                    clientCountry: 1,
                    serviceNeeded: 1,
                    serviceLocationPostal: 1, 
                    serviceLocationTown : 1,
                    serviceTitle: 1,
                    serviceDes: 1,
                    pointsNeeded: 1,
                    isClientEmailVerify : 1,
                    isClientPhoneNoVerify : 1,
                    projectTimeStamp: 1,
                    proposals : 1,
                    clientPictureLink: 1,
                    maxBid : 1,
                    projectMaxPrice : 1,
                    projectUrgentStatus : 1,
                    serviceLocationTown : 1
                });
            }
            else{
                projects = await ProjectsData.find({
                    $and: [
                        // Match based on primary service or bio relevance
                        {
                            $or: [
                                { serviceNeeded: { $regex: primaryServiceRegex } },
                                { serviceDes: { $regex: primaryServiceRegex } },
                                { serviceDes: { $regex: bioRegex } }
                            ]
                         },
                        // Match based on professional skills with serviceNeeded or serviceDes using $or
                        // {
                        //     $or: skillsRegexArray.map(skillRegex => ({
                        //         $or: [
                        //             { serviceNeeded: { $regex :   skillRegex  } },
                        //             { serviceDes: { $regex: skillRegex } }
                        //         ]
                        //     }))
                        // },
                        // Match location based on postal codes
                        { serviceLocationPostal: { $in: data.professionalServiceLocPostCodes } },
                        // Filter other project criteria
                        { maxBid: { $gt: 0 } },
                        { projectStatusAdmin: true },
                        { awardedStatus: "unawarded" }
                    ]
                }).select({
                    clientId: 1,
                    clientName: 1,
                    clientCountry: 1,
                    serviceNeeded: 1,
                    serviceLocationPostal: 1, 
                    serviceLocationTown : 1,
                    serviceTitle: 1,
                    serviceDes: 1,
                    pointsNeeded: 1,
                    isClientEmailVerify : 1,
                    isClientPhoneNoVerify : 1,
                    projectTimeStamp: 1,
                    proposals : 1,
                    clientPictureLink: 1,
                    maxBid : 1,
                    projectMaxPrice : 1,
                    projectUrgentStatus : 1,
                    serviceLocationTown : 1
                });
            }  
        }

        // Filter out projects that already have a proposal from the professional
        let finalData;
        if(projects.length>0){
            finalData = projects.filter(project => {
                if(project.proposals.length>0){
                    let isApplied = data.proposals.some((proposal) => {return(proposal.professionalId == data._id)});
                    return !isApplied; 
                }
                return(project);
            }).map(project => {
                // Create a shallow copy of the project object and delete the 'proposals' field
                let projectWithoutProposals = { ...project._doc }; // "_doc" is used to access the actual document
                delete projectWithoutProposals.proposals;
                return projectWithoutProposals;
            });
            
            
            if(choice === "leads"){
                res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: finalData , userSkills : data.professionalSkills, userPrimarySkill : data.professionalPrimaryService});
            }
            else if(choice === "dashboard"){
                res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: finalData.length });
            }
        }
        else{
            if(choice === "leads"){
                res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: [], userSkills : data.professionalSkills, userPrimarySkill : data.professionalPrimaryService });
            }
            else if(choice === "dashboard"){
                res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully",data: 0 });
            }
        }

        // console.log(finalData);
        // res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: finalData });
    } catch (e) {
        // console.log("Error while adding professional's details", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};


module.exports = showLeadsController;