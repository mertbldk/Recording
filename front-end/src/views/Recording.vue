<template>
    <div id="recordingContainer">
        <div id="recordingWarning">
            <div v-if="warning.type" id="warning" :class="warning.color">{{warning.resultType}}</div>
        </div>
        <div id="recordingCap">
            <div id="recordingLogin">
                <form @submit.prevent="login">
                    <div id="loginTitle">Login</div>
                    <input id="loginText" v-model="loginVariable.gmail" type="email" placeholder="Gmail" required>
                    <input id="loginPassword" v-model="loginVariable.password" type="password" placeholder="Password" required>
                    <input id="loginSubmit" type="submit" value="Login">
                </form>
            </div>
            <div id="recordingRegister">
                <form @submit.prevent="register">
                    <div id="registerTitle">Register</div>
                    <div id="registerNameSurname">
                        <input type="text" v-model="registerVariable.name" placeholder="Name" required>
                        <input type="text" v-model="registerVariable.sur_name" placeholder="Sur Name" required>
                    </div>
                    <div id="registerGmail">
                        <input type="email" v-model="registerVariable.gmail" placeholder="E-mail" required>
                    </div>
                    <div id="registerPassowrd">
                        <input type="password" v-model="registerVariable.password" placeholder="Password" required>
                        <input type="password" v-model="registerVariable.repeatChangePassword" placeholder="Chang Password" required>
                    </div>
                    <input id="registerSubmit" type="submit" value="Register">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import SecureLs from 'secure-ls';

export default {
    data() {
        return {
            registerVariable:{
                name:'',
                sur_name:'',
                gmail:'',
                password:'',
                repeatChangePassword:'',
            },
            loginVariable:{
                gmail:'',
                password:'',
            },
            warning : {
                type:false,
                color:'',
                resultType : ''
            },
            url : "http://localhost:3000",
        }
    },
    methods: {
        register(){

            if(this.registerVariable.password == this.registerVariable.repeatChangePassword){

                fetch(`${this.url}/register`,{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify({
                        name : this.registerVariable.name,
                        sur_name : this.registerVariable.sur_name,
                        gmail : this.registerVariable.gmail,
                        password : this.registerVariable.password,
                    })
                })
                .then((result)=>{
                    return result.json();
                })
                .then((result)=>{

                    this.warning.resultType = result.type;
                    this.warning.type = true;
    
                    if(result.tf) {

                        this.warning.color = 'blue';
                        new SecureLs().set('userİnfo',result.result);
    
                        setTimeout(()=>location.assign('/user'),500);
                        
                    }
                    else{
    
                        this.warning.color = 'red';
                        setTimeout(()=>this.warning.type = false,1500);
    
                    }

                })

            }else {

                this.warning.type = true;
                this.warning.resultType = 'Şifre eşeleşmiyor.';
                this.warning.color = 'red';

                setTimeout(()=>this.warning.type = false,1500);
    
            }
            
        },
        login(){

            fetch(`${this.url}/login`,{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({
                    gmail : this.loginVariable.gmail,
                    password : this.loginVariable.password,
                })
            })
            .then((result)=>{
                return result.json();
            })
            .then((result)=>{

                this.warning.resultType = result.type;
                this.warning.type = true;

                if(result.tf) {

                    this.warning.color = 'blue';
                    new SecureLs().set('userİnfo',result.result)

                    setTimeout(()=>location.assign('/user'),500);
                    
                }
                else{

                    this.warning.color = 'red';
                    setTimeout(()=>this.warning.type = false,1500);

                }

            })

        }
    },
}
</script>