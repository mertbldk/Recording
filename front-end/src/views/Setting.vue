<template>
    <div id="settingContainer">
        <div id="recordingWarning">
            <div v-if="warning.type" id="warning" :class="warning.color">{{warning.resultType}}</div>
        </div>
        <form @submit.prevent="SettingChange" id="settingRegister">
            <div id="settingTitle">Setting</div>
            <div id="settingNameSurname">
                <input type="text" :name="userİnfo.name" v-model="userİnfo.name" placeholder="Name" required>
                <input type="text" :name="userİnfo.sur_name" v-model="userİnfo.sur_name" placeholder="Sur Name" required>
            </div>
            <div id="settingGmail">
                <input type="email" :name="userİnfo.gmail" v-model="userİnfo.gmail" placeholder="E-mail" required>
            </div>
            <div id="settingPassowrd">
                <input type="password" :name="userİnfo.password" v-model="userİnfo.password" placeholder="Password" required>
                <input type="password" :name="userİnfo.passowrdRepeat" v-model="userİnfo.passowrdRepeat" placeholder="Repeat Password" required>
            </div>
            <input id="settingSubmit" type="submit" value="Change">
            <input @click="settingDelet" id="settingDelet" type="button" value="Delet">
        </form>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import SecureLs from 'secure-ls';

export default {
    data() {
        return {
            url : "http://localhost:3000",
            userİnfo : {
                name : '',
                sur_name : '',
                gmail : '',
                password : '',
                passowrdRepeat : '',
                id : ''
            },
            warning : {
                type:false,
                color:'',
                resultType : ''
            },
        }
    },
    methods: {
        SettingChange(){

            if(this.userİnfo.password == this.userİnfo.passowrdRepeat){

                fetch(`${this.url}/setting/${this.userİnfo.id}`,{
                    method:'PUT',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify({
                        name : this.userİnfo.name,
                        sur_name : this.userİnfo.sur_name,
                        gmail : this.userİnfo.gmail,
                        password : this.userİnfo.password,
                    })
                })
                .then((result)=>{
                    return result.json();
                })
                .then((result)=>{
                    
                    this.warning.resultType = result.type;
                    this.warning.type = true;
                    this.warning.color = 'blue';

                    localStorage.removeItem('userİnfo');

                    setTimeout(()=>new SecureLs().set('userİnfo',result.result),500);

                    setTimeout(()=>window.location.reload(),1000);
                   
                })

            }else{
                
                this.warning.resultType = 'Şifre eşleşmiyor.';
                this.warning.type = true;
                this.warning.color = 'red';
                setTimeout(()=>this.warning.type = false,1500);

            }

        },
        settingDelet(){

            if(confirm('Hesabınızı kalıcı olarak silmek istediğinizden eminmisiniz?')){

                fetch(`${this.url}/setting/${this.userİnfo.id}`,{
                    method:'DELETE',
                    headers:{
                        'content-type':'application/json'
                    },
                })
                .then((result)=>{
                    return result.json();
                })
                .then((result)=>{
    
                    this.warning.resultType = result.type;
                    this.warning.type = true;
                    this.warning.color = 'red';
    
                    localStorage.removeItem('userİnfo');
                    setTimeout(()=>location.assign('/recording'),500);
    
                })

            }
                
        }
    },
    created() {

        let local = new SecureLs().get('userİnfo');

        const key = "CryptoPassword";
        const passwordCryptoJS = CryptoJS.AES.decrypt(local.password,key).toString(CryptoJS.enc.Utf8);

        this.userİnfo.name = local.name;
        this.userİnfo.sur_name = local.sur_name;
        this.userİnfo.gmail = local.gmail;
        this.userİnfo.password = passwordCryptoJS;
        this.userİnfo.passowrdRepeat = passwordCryptoJS;
        this.userİnfo.id = local._id;

    },
}
</script>