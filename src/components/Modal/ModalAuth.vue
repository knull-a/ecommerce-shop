<script setup lang="ts">
import { ref } from 'vue';
import * as yup from 'yup'
import { useForm } from 'vee-validate';
import CustomButton from '@/components/Custom/CustomButton.vue';
import CustomInput from "@/components/Custom/CustomInput.vue";

type Auth = {
  email: string
  password: string
  confirm_password: string
}

const isSignUp = ref(false)

const { handleSubmit } = useForm()

const validationSchema = 
  yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().min(6).required(),
    confirm_password: yup.string()
      .required()
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  })



useForm({
  validationSchema: validationSchema
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})


</script>
<template>
  <div>
    <form class="flex flex-col gap-3" @submit="onSubmit" :validation-schema="validationSchema">
      <CustomInput placeholder="Email" type="email" name="email" />
      <CustomInput placeholder="Password" type="password" name="password" />
      <CustomInput v-show="isSignUp" placeholder="Confirm password" type="password" name="confirm_password" />
      <div class="flex">
        <div class="flex items-center gap-1">
          <input type="checkbox" name="remember" id="remember">
          <label for="remember">Remember Me</label>
        </div>
        <div>
          <CustomButton classes="bg-transparent p-0 text-grey" type="button" text="Recovery Password" />
        </div>
      </div>
      <CustomButton type="submit" text="Login" is-full />
      <CustomButton classes="bg-transparent text-[#000] border border-primary" type="button" text="Sign in with Google" is-full />
    </form>
  </div>
</template>
