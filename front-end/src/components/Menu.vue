<template>
    <div id="menuContainer">
        <div id="menuLogo">
            <p>Recording</p>   
        </div>
        <div id="menuUser">
            <div v-if="userType" id="userActive">
                <div id="userNameButton">
                    <router-link to="/user" id="userName" :title="`${userLocal.name} ${userLocal.sur_name}`">{{userLocal.name}} {{userLocal.sur_name}}</router-link>
                    <div id="userButton"><fa icon="angle-up"></fa></div>
                </div>
                <div id="userSettinQuit">
                    <div id="userSetting"><router-link :to="`/setting`">Setting</router-link></div>
                    <div id="userQuit"><button @click="quit">Quit</button></div>
                </div>
            </div>
            <router-link v-else to="/recording" id="userClosed">Login</router-link>
        </div>
    </div>
</template>

<script>
import SecureLs from 'secure-ls';

export default {
    data() {
        return {
            userType : localStorage.getItem('userİnfo') == null || localStorage.getItem('userİnfo') == "" ? false : true,
            userLocal : new SecureLs().get('userİnfo'),
        }
    },
    methods: {
        quit(){

            localStorage.removeItem('userİnfo');
            setTimeout(()=>location.assign('/recording'),500);

        },
    },
}
</script>