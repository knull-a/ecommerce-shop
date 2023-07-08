<script setup lang="ts">
import { computed } from 'vue';
import type { FirebaseError } from 'firebase/app';
import { ref } from 'vue';
import * as yup from 'yup'
import { useForm } from 'vee-validate';
import CustomButton from '@/components/Custom/CustomButton.vue';
import CustomInput from "@/components/Custom/CustomInput.vue";
import { auth } from '@/data';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { RouteNames } from '@/router/routeNames';

type Emits = {
  (e: 'toggleModal'): void
}

const emit = defineEmits<Emits>()

const router = useRouter()

const isSignUp = ref(false)
const loginStatus = computed(() => isSignUp.value ? 'Sign Up' : 'Sign In')
const loginOppositeStatus = computed(() => isSignUp.value? 'Sign In' : 'Sign Up')

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

const isSignUpToggle = () => isSignUp.value = !isSignUp.value

const onSubmit = handleSubmit((values) => {
  signInWithEmailAndPassword(auth, values.email, values.password).then((data) => {
    console.log(auth.currentUser)
    emit('toggleModal')
    router.push({ name: RouteNames.PROFILE })
  })
    .catch((error) => {
      const e = error as FirebaseError
      console.error(e, e.code)
    })
})

</script>
<template>
  <div>
    <h3 class="text-lg mb-2 font-bold">{{ loginStatus }}</h3>
    <form class="flex flex-col gap-3" @submit="onSubmit" :validation-schema="validationSchema">
      <CustomInput placeholder="Username" type="text" name="username" />
      <CustomInput placeholder="Email" type="email" name="email" />
      <CustomInput placeholder="Password" type="password" name="password" />
      <CustomInput v-show="isSignUp" placeholder="Confirm password" type="password" name="confirm_password" />
      <div class="flex justify-between">
        <div class="flex items-center gap-1">
          <input type="checkbox" name="remember" id="remember">
          <label for="remember">Remember Me</label>
        </div>
        <div>
          <CustomButton variation="flat" text="Recovery" />
        </div>
      </div>
      <CustomButton type="submit" text="Confirm" is-full />
      <CustomButton variation="outlined" text="Continue with Google"
        is-full />
      <div>
        <span class="mr-1">Not registered yet?</span>
        <CustomButton @click="isSignUpToggle" variation="flat" :text="loginOppositeStatus"/>
      </div>
    </form>
  </div>
</template>
