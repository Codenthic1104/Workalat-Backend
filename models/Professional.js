require("dotenv").config();
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");


let ProfessionalDataSchema  = new mongoose.Schema({
    professionalFName : {
        type : String,
        lowercase : true,
        default : ""
   },
   professionalLName : { 
        type : String,
        lowercase : true,
        default : ""
   },
   professionalFullName : { 
        type : String,
        lowercase : true, 
        default : ""
   }, 

   //Toggles
   isTwoFactAuth : {  //true / false
    type : Boolean,
    default : false
   },
   markAsAvailalbe : {
    type : Boolean,
    default : false
   },
   activeChat:{
    type : Boolean,
    default : true
   },
   myRequest : {
    type : Boolean,
    default : false
   },
   chatNotifications : {
    type : Boolean,
    default : false
   },
   reminderChats : {
    type : Boolean,
    default : false
   },


   professionalEmail : {
    type : String,
    default : ""
    },
   isprofessionalEmailVerify : {
    type : Boolean,
    default : false
   },
    professionalPassword: {
        type : String,
        default : ""
    },
    professionalPhoneNo : { 
        type : String,
        default : ""
    },
    isprofessionalPhoneNoVerify : {
        type : Boolean,
        default : false
    },
    isprofessionalPicture : { 
        type : Boolean,
        default : false
    }, 
    professionalPictureLink : {
        type : String,
        default : "https://www.w3schools.com/howto/img_avatar.png"
    },
    professionalCountry : {
        type : String,
        lowercase: true,
        default : ""
    },
    professionalCountryCode : {
        type : String,
        default : ""
    },
    professionalRegisterationType : {  //Email / Phone No / Google
        type : String,
        lowercase : true,
        default : ""
    },
    registerAs : {  // Professional / Client
        type : String,
        lowercase : true,
        default : ""
    },
    clientId : {
        type : String,
        default : ""
    },
    professionalCountry : {
        type : String,
        lowercase : true,
        default : ""
    }, 
    professionalCountryCode : {
        type : String,
        lowercase : true,
        default : ""
    },
    professionalAddress : {
        type : String,
        lowercase : true,
        default : ""
    },
    professionalBio : {
        type : String,
        default : '',
        lowercase : true
    },
    professionalCompanyName : {
        type : String,
        lowercase : true,
        default : ""
    },
    professionalCompanyTitle : {
        type : String,
        lowercase : true,
        default : ""
    },
    professionalCompanyPhoneNo : {
        type : Number,
        default : 123456789
    },
    professionalDocumentType : {
        type : String,
        lowercase : true,
        default : ""
    },
    professionalDocumentLink : {
        type : String,
        default : ""
    },
    professionalCompanywebsite : {
        type : String,
        default : ''
    },
    professionalCompanySize : {
        type : String,
        lowercase : true,
        default : ''
    },
    professionalCompanyServices : {
        type : Array,
        default : []
    },
    professionalCompanyAddress : {
        type : String,
        lowercase : true,
        default : "",
    },
    professionalServiceLocPostCodes :{  //postcode
        type : Array,
        default : []
    },
    professionalServiceLocCity :{ //city or town
        type : String,
        lowercase : true,
        default : ""
    },
    professionalServiceLocCountry :{ //Country
        type : String,
        lowercase : true,
        default : ""
    },
    professionalChatId : {
        type : String,
        default : ""
    },
    professionalPrimaryService: { //(Dry Cleaning & Laundry Service)
        type: String,
        lowercase : true,
        default : ""
    },
    professionalAdditionalServices: {   //[“ironing services”, “packing services”]
        type: Array 
    },
    professionalSkills : {
        type : Array,
        default : []
    },
    professionalTotalAmountEarned : {
        type : Number,
        default : 0
    },
    professionalTotalWalletAmount : {
        type : Number,
        default : 0
    },
    professionalTotalBidPoints : { 
        type : Number,
        default : 10
    }, 
    totalRatings : {
        type : Number,
        default : 0
    },
    totalReviews : {
        type : Number,
        default : 0
    },
    totalProjectsCompleted : {
        type : Number,
        default : 0
    }, 
    professional_level :{ 
        type : String,
        default : "1"
    },
    payAsGo:{
        type : Boolean,
        default : false
    },
    clientDashAccess : {
        type : Boolean,
        default : false
    },
    professionalDashAccess : {
        type : Boolean,
        default : true
    },
    adminAccessProfessional : {
        type : Boolean,
        default : true 
    },
    isprofessionalBidAccess : {
        type : Boolean,
        default : true
    },
    completeProfileRegistration : {
        type : Boolean,
        default : false
    },
    ProfessionalChatSettings : {  //active/unactive
        type : String,
        lowercase : true,
        default : "unactive"
    },
    ProfessionalReviewSettings : {  //active/unactive
        type : String,
        lowercase : true,
        default : "unactive"
    },
    ProfessionalFeatureUpdateSettings : {  //active/unactive
        type : String,
        lowercase : true,
        default : "unactive"
    },
    stripeCustomerId :{
        type : String,
        default : ""
    },
    ChangingDates : [{
        passwordLast : {type : Date, default : Date.now()},
        twoFactAuthLast : {type : Date, default : Date.now()},
        kycLast : {type : Date, default : Date.now()},
        phoneLast : {type : Date, default : Date.now()},
    }],
    kycStatus : {
        type : String,
        lowercase  : true,
        default : "notApplied" //notApplied / pending / approved / rejected
    },
    kyc : [{
        firstName : {type : String,lowercase : true},
        lastName : {type : String, lowercase : true},
        email : {type : String, lowercase : true},
        phoneNo : {type : String,default : "" },
        companyName : {type : String, lowercase : true},
        companyNumber : {type : String,},
        address : {type : String, lowercase : true},
        documentType : {type : String, lowercase : true, default : ""},
        idNumber : {type : String,  default : ""},
        postcode : {type : String, default : ""}, 
        documentPictures : {type : Array, default : []},
        adminComment : {type : String, default : ""},
        timeStamp :  {type : Date}
    }],
    accountCreationDate : { 
        type : Date,
        default : Date.now()
    },
    lastLoginDate : {
        type : Date,
        default : Date.now()
    },
    proposals : [{
        projectId : {type : String},
        projectServiceNeeded : {type : String},
        projectTitle : {type : String},
        projectDes : {type : String},
        projectPostalCode : {type : String},
        projectCity : {type: String},
        professionalId :{type : String},
        professionalName :{type : String},
        professionalProposalDes :{type : String},
        clientId :{type : String},
        clientName :{type : String},
        clientEmail :{type : String},
        clientPhoneNo :{type : String},
    }],
    awardedProjects : {
        type : Array,
        default  : []
    },
    paymentHistory : {
        type : Array,
        default : []
    }, 
    isPaymentVerify : {
        type : Boolean,
        default : false
    },
    isAppliedCertificate : {
        type : Boolean,
        default : false
    },
    certifications : [{
        professionalId : {type : String},
        professionalName : {type : String},
        timeStamp : {type : Date},
        status : {type : String},
        certificateTitle : {type : String},
        certificateExpirationMonth : {type: String},
        certificateExpirationYear :{type : String},
        isExpired :{type : String},
        certificationImage :{type : String},
        adminComment :{type : String},
    }],
    pointsHistory : [{
        transactionId : {type : String},
        transactionDes : {type : String},   //how much points have been bought
        points : {type: String},
        transactionAmount : {type : String},
        transactionTimeStamp : {type : String},  
        des : {type : String},
        transactionStatus : {type : String, default : "fail" }   //success/fail
    }], 
    
    reviews : [{
        giverId : {type : String},
        projectId : {type : String},
        projectName : {type : String},
        giverName : {type : String},
        giverPictureLink : {type : String, default : ""},
        giverCountry : {type : String, default : ""},
        giverRating : {type : Number},
        gvierCountry : {type : String, default : ""},
        giverReview : {type: String},
        revieTimeStamp : ({type: Date, default : Date.now()})
     }],
    
    tokens :[{
        token: {
            type: String
        }
    }], 
    membershipLeads : {
        type : Number,
        default : 0
    },
    profileStatus: { 
        type : String,
        default : "normal"  //normal/premium
    },
    isMembership : {
        type : Boolean,
        default : false
    },
    membershipStatus : {
        type : String,
        default : "closed"  // pending(isMembership : false)  active (isMembership : true), closed/cancelled (isMembership : false), expired (isMembership: true)
    },
    memberShipExpirationDate: {
        type : Date,
    },
    membershipTransactionHistory : [{
        transactionId : {type : String},
        transactionAmount : {type : Number},
        transactionAmountTax : {type : Number},
        totalTransactionAmount : {type : Number},
        professionalId : {type : String},
        professionalName : {type : String},
        transactionPurpose : {type : String, default : ""},
        transactionDes : {type : String, default : ""},
        transactionStatus : {type : String}, //pending/success/cancelled
        isRequestCancellation : {type: Boolean, default  : false},
        timeStamp : {type: Date, default : Date.now()},
        adminComment : {type : String, default : ""}
     }],


    

})


//Login token creation
ProfessionalDataSchema.methods.generateAuthToken  = async function(){
    try{
        let token = jwt.sign({
            _id: this._id,
            registerAs : this.registerAs
            }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        console.log("Token Generated in Model 2", token); //Checking if the token has been generated 
        await this.save()
        return(token)
    }
    catch(e){
        console.log("Auth generating Error", e);
    }
}


//Hashing user password
ProfessionalDataSchema.pre("save", async function(next){
    if(this.isModified("professionalPassword")){
        this.professionalPassword = await bcrypt.hash(this.professionalPassword, 10);
    }
    next();
});


let ProfessionalsData =  new mongoose.model("ProfessionalData", ProfessionalDataSchema);

module.exports = ProfessionalsData;