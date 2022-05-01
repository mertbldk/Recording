<template>
    <div id="userContainer">
        <p>Welcome {{localNameSurName}}</p>
    </div>
</template>

<script>
import SecureLs from 'secure-ls';

export default {
    data() {
        return {
            localNameSurName : new SecureLs().get('userİnfo').name + " " + new SecureLs().get('userİnfo').sur_name
        }
    },
}
</script>

<style lang="scss">
$blue : rgb(47, 130, 255);
#userContainer{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
        color: $blue;
        font-size: 2em;
        font-weight: bold;
    }
}
</style>