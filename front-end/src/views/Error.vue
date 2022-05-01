<template>
    <div id="errorContainer">
        <p>No Page</p>
    </div>
</template>

<style lang="scss">
$blue : rgb(47, 130, 255);
#errorContainer{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
        color: $blue;
        font-size: 5em;
        font-weight: bold;
    }
}
</style>