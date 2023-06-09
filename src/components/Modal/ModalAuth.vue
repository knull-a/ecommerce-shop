<script setup lang="ts">
import { ref } from 'vue';
import * as yup from 'yup'
import { useForm } from 'vee-validate';
import CustomButton from '@/components/Custom/CustomButton.vue';
import CustomInput from "@/components/Custom/CustomInput.vue";
import { auth } from '@/data';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import { useRouter } from 'vue-router';

type Auth = {
  email: string
  password: string
  confirm_password?: string
}

const router = useRouter()

const isSignUp = ref(false)

const validationSchema =
  yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().min(6).required(),
  })
  // confirm_password: yup.string()
  //   .required()
  //   .oneOf([yup.ref('password')], 'Passwords do not match'),

const { handleSubmit } = useForm({
  validationSchema
})

const onSubmit = handleSubmit((values) => {
  signInWithEmailAndPassword(auth, values.email, values.password).then((data) => {
    console.log('registered')
    console.log(auth.currentUser)
    router.push("/")
  })
    .catch((error) => {
      const e = error as FirebaseError
      console.error(e, e.code)
    })
})

</script>
<template>
  <div>
    <form class="flex flex-col gap-3" @submit="onSubmit" :validation-schema="validationSchema">
      <CustomInput placeholder="Email" type="email" name="email" />
      <CustomInput placeholder="Password" type="password" name="password" />
      <!-- <CustomInput v-show="isSignUp" placeholder="Confirm password" type="password" name="confirm_password" /> -->
      <div class="flex justify-between">
        <div class="flex items-center gap-1">
          <input type="checkbox" name="remember" id="remember">
          <label for="remember">Remember Me</label>
        </div>
        <div>
          <CustomButton classes="bg-transparent p-0 text-primary" type="button" text="Recovery" />
        </div>
      </div>
      <CustomButton type="submit" text="Login" is-full />
      <CustomButton classes="bg-transparent text-primary border border-primary" type="button" text="Sign in with Google"
        is-full />
    </form>
  </div>
</template>
