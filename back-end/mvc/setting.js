//Packets
const schema = require('../schema/recording');
const CryptoJS = require("crypto-js");

//Code
const settingPut = async (request,response)=>{

    const {id} = request.params;
    const {password} = request.body;
    const body = request.body;

    const key = "CryptoPassword";
    const CryptoPassword = CryptoJS.AES.encrypt(password,key).toString();

    await schema.findByIdAndUpdate(id,{
        ...body,
        _id : id,
        password : CryptoPassword,
    })
    .then(async ()=>{

        await schema.findById(id)
        .then((result)=> response.json({type:'Making changes..',result}))
        .catch((e)=>{
            console.log(e)
            response.json({type:'Data not found, try again.'})
        })
        
    })
    .catch((e)=> {
        console.log(e)
        response.json({type:'Failed to make changes.'})
    })
}

const settingDelet = async (request,response)=>{

    const {id} = request.params;

    schema.findByIdAndRemove(id)
    .then(()=>{
        response.json({type:'Your account is being deleted..'})
    })
    .catch((e)=>{
        console.log(e);
        response.json({type:'Account deletion is incorrect.'})
    })
}

module.exports = {settingPut,settingDelet};
