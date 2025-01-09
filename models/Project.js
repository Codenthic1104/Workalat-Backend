require("dotenv").config();
let mongoose = require("mongoose");


let ProjectSchema  = new mongoose.Schema({
   clientId: {
        type: String, 
        default : ""
   },
   clientName : {
        type  : String,
        lowercase: true,
        default : "" 
   },
   kycStatus : {
    type  : String,
    lowercase: true,
    default : ""
   },
   clientUsername : { 
        type  : String,
        lowercase: true,
        default : ""
    },
    isPaymentVerify : {
        type : Boolean,
    },
    clientPhoneNo : {
        type  : Number,
        default : 123456789
    },
    clientEmail : {
        type  : String,
        default : ""
    },
    isClientPhoneNoVerify: {
        type : Boolean,
        default : false
    },
    isClientEmailVerify: {
        type : Boolean,
        default : false
    },
    clientPictureLink : {
        type : String,
        default : ""
    },
    clientCountry : {
        type : String,
        lowercase: true,
        default : ""
    },
    serviceNeeded : {
        type : String,
        lowercase: true,
        default : ""
    },
    serviceCategory : {
        type : String,
        lowercase: true,
        default : ""
    },
    serviceCategoryService : {
        type : Array,
        lowercase: true,
        default : ""
    },
    serviceLocationPostal:{ 
        type : String,
        default : ""
    },
    serviceLocationTown :{
        type : String,
        default : ""
    },
    serviceLocationCountry:{
        type : String,
        lowercase: true,
        default : ""
    }, 
    serviceTitle : {
        type : String,
        lowercase: true,
        default : ""
    },
    serviceDes : {
        type : String,
        lowercase: true,
        default : ""
    },
    serviceAdditionalDet : {
        type : Array,
        default : []
    },
    isAdditionalService : {
        type : Boolean,
        lowercase: true,
        default : false
    },
    additionalServiceTitle : {
        type : String,
        lowercase: true,
        default : ""
    },
    serviceFrequency : {
        type: String,
        lowercase: true,
        default : ""
    },
    serviceFrequencyDays:{
        type : Number,
        default : 0
    }, 
    isProjectFile:{
        type : Boolean,
        default : false
    },
    projectFileURL : {
        type : Array,
        default : []
    },
    projectQuestions : {
        type : Array, 
        default : []
    },
    projectPrice : {
        type : Number,
        default : 0
    },
    projectMaxPrice : {
        type : Number,
        default : 0
    },
    projectPriceString: {
        type : String,
        default : "" 
    },
    projectPriceTitle: { //Small project ($150 or less)
        type : String,
        default : ""
    },
    confirmedPrice : {
        type : Number,
        default : 0
    },
    paidPrice : {
        type : Number, 
        default : 0
    },
    taskLists : {
        type : Array,
        default : []
    },
    projectUrgentStatus :{
        type : String,
        default : "flexible" //urgent,flexible/later/planning & researching
    }, 
    pointsNeeded : {
        type : Number
    },
    maxBid : {
        type : Number,
        default : 5
    },
    projectStatusAdminString:{
        type : String,
        default : "pending"
    },
    projectStatusAdmin: {
        type : Boolean,
        default : false
    },
    isProjectUrgent : {
        type : Boolean,
        default : false
    },
    projectStatusClient : {   //pending/awarded/completed/cancel
        type : String, 
        lowercase: true,
        default : "pending"
    }, 
    projectStatusProfessional : {   //pending/awarded/completed/cancel
        type : String, 
        lowercase: true,
        default : "pending" 
    }, 
    awardedStatus : {  //awarded/unawarded
        type : String,  
        lowercase: true,   
        default : "unawarded"
    },
    projectStatus : {//active/completed/  
        type : String,  
        lowercase: true,   
        default : "active"
    },
    awardedId : {  //id of awarded professional
        type : String,
        default : ""
    }, 
    paymentStatus : {  //complete / incomplete
        type : String,
        lowercase: true,
        default : "incomplete"
    },
    paymentInvoiceNumber : {
        type : String,
        default : ""
    },
    clientChatId : {
        type : String
    },
    proposals : [{
        ProjectId : {
            type : String
        },
        professionalPicture : {
            type : String 
        },
        professionalId : {
            type : String
        },
        professionalName : {
            type : String,
            lowercase: true,
        },
        professionalTotalReviews: {
            type : Number
        },
        professionalTotalRatings: {
            type : Number
        },
        professionalChatId: {
            type : String
        },
        awardedStatusClient : {  //awarded/unawarded
            type : String,
            lowercase: true,     
            default : "unawarded"
        },
        bidTimeStamp: {
            type: Date 
        },
        proposal : {
            type: String
        }
    }],
    awardedDetails : {  //id of awarded database
        type : String,
        default : ""
    },
    awardedTimeStamp : {
        type: Date
    },
    projectTimeStamp: { 
        type: Date,
        default : Date.now()
    },
    awardedProfessionalId : {
        type : String, 
        default : ""
    },
    requestReleaseProfessional : {
        type : Boolean,
        default : false
    },
    clientReview : { 
        type : Object,
        default : {}
    },
    professionalReview : {
        type : Object,
        default : {}
    },
    milestoneDetails : [{
        transactionId : {type : String, default : ""},
        clientId : {type : String},
        professionalId : {type : String,},
        milestoneTitle : {type : String, },
        milestoneAmount : {type : Number},
        milestoneStatusClient : {type : String, default : "unpaid"},
        milestoneStatusProfessional : {type : String, default : "unrecieved"},
        milestoneTimeStamp : {type: Date},
        transactionTimeStamp : {type : Date, default : null},
     }],

})


let ProjectsData =  new mongoose.model("Project", ProjectSchema);

module.exports = ProjectsData;