<script setup lang="ts">
import * as yup from 'yup'
import CustomButton from '@/components/Custom/CustomButton.vue';
import CustomInput from "@/components/Custom/CustomInput.vue";

const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().min(6).required(),
  confirm_password: yup.string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

</script>
<template>
  <div>
    <form>
      <CustomInput type="email" name="email" />
      <CustomInput type="password" name="password" />
      <CustomInput type="password" name="confirm_password" />
      <CustomButton type="button" text="Sign In" is-full />
    </form>
  </div>
</template>
<style scoped></style>