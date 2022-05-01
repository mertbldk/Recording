//Packets
const CryptoJS = require("crypto-js");
const schema = require('../schema/recording');

//Code
const registerPost = async (request,response)=>{

    try {
        const {gmail,password} = request.body;
        const body = request.body;
        
        await schema.findOne({gmail})
        .then((result)=> {

            if(result == null) {

                const key = "CryptoPassword";
                const CryptoPassword = CryptoJS.AES.encrypt(password,key).toString();
            
                schema.create({
                    ...body,
                    password : CryptoPassword,
                })

                .then(()=> {

                    schema.findOne({gmail})
                    .then((result)=>response.json({type:'Registration completed.',tf:true,result}))
                    .catch(()=> response.json({type:'Data error.',tf:false}))

                })
                .catch(()=> response.json({type:'An error occurred during the registration process.',tf:false}))

                
            }else response.json({type:'There is such a gmail address.',tf:false})

        })
        .catch((e)=> {
            console.log(e);
            response.json({type:'Error occurred.',tf:false})
        })

    }catch (error) {
        console.log(error);
    }

}

module.exports = {registerPost};
