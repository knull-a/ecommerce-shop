<script setup lang="ts">
import { ref } from "vue";
import {auth} from "@/data"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter()

const credentials = ref({
    email: '',
    password: ''
})

const register = () => {
    
}

const signInWithGoogle = () => {

}
</script>
<template>
<div class=" m-96">
    <div>Create an account</div>
    <div><input type="text" v-model="credentials.email"></div>
    <div><input type="text" v-model="credentials.password"></div>
    <button @click="register">
        register
    </button>
    <button @click="signInWithGoogle">

    </button>
</div>
</template>
<style scoped>

</style>
