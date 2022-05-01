//Packets
const CryptoJS = require("crypto-js");
const schema = require('../schema/recording');

//Code
const loginGet = async (request,response)=>{

    const {gmail,password} = request.body;
    
    await schema.findOne({gmail})
    .then((result)=>{

        if(result != null){

            const key = "CryptoPassword";
            const bytes = CryptoJS.AES.decrypt(result.password,key).toString(CryptoJS.enc.Utf8);

            if(bytes == password) response.json({type:'Logging in...',tf:true,result})
            else response.json({type:'The password is incorrect.',tf:false})

        }else response.json({type:'Registered user not found.',tf:false})

    })
    .catch((e)=>{
        console.log(e);
        response.json({type:'Registration error.',tf:false})
    })

}

module.exports = {loginGet}