<script setup lang="ts">
import { computed } from 'vue';
import { db } from '@/data';
import { ref } from 'vue';
import * as yup from 'yup'
import { useForm } from 'vee-validate';
import CustomButton from '@/components/Custom/CustomButton.vue';
import CustomInput from "@/components/Custom/CustomInput.vue";
import { auth } from '@/data';
import { browserLocalPersistence, browserSessionPersistence, inMemoryPersistence, setPersistence, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { RouteNames } from '@/router/routeNames';
import { doc, setDoc } from 'firebase/firestore';

type Emits = {
  (e: 'toggleModal'): void
}

const emit = defineEmits<Emits>()

const router = useRouter()

const isSignUp = ref(false)
const persisting = ref(false)
const errorMessage = ref('')

const loginStatus = computed(() => isSignUp.value ? 'Sign Up' : 'Sign In')
const loginOppositeStatus = computed(() => isSignUp.value ? 'Sign In' : 'Sign Up')


const validationSchema =
  yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().min(6).required(),
  })
// confirm_password: yup.string()
//   .required()
//   .oneOf([yup.ref('password')], 'Passwords do not match'),

const provider = new GoogleAuthProvider();
const { handleSubmit } = useForm({
  validationSchema
})

const isSignUpToggle = () => isSignUp.value = !isSignUp.value

const onSubmit = handleSubmit(async (values) => {
  await setPersistence(auth, persisting.value ? browserLocalPersistence : browserSessionPersistence).then(async () => {
    if (isSignUp.value) {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          console.log(auth.currentUser)
          emit('toggleModal')
          router.push({ name: RouteNames.PROFILE })
        })
        .catch((error) => {
          console.log(error)
          errorMessage.value = error.message;
        });
      await setDoc(doc(db, "users", auth.currentUser?.uid as string), {
        cart: [],
        id: auth.currentUser?.uid,
        username: values.username,
        wishlist: []
      });
      return
    }
    await signInWithEmailAndPassword(auth, values.email, values.password).then((data) => {
      console.log(auth.currentUser)
      emit('toggleModal')
      router.push({ name: RouteNames.PROFILE })
    })
      .catch((error) => {
        console.log(error)
        errorMessage.value = error.message;
      })
  })
})

const signInWithGoogle = async () => {
  await signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(user, credential)
      await setDoc(doc(db, "users", user.uid), {
        cart: [],
        id: user.uid,
        username: user.email,
        wishlist: []
      });
      emit('toggleModal')
      router.push({ name: RouteNames.PROFILE })
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(email, credential, errorMessage)
    });
}

</script>
<template>
  <div>
    <h3 class="text-lg mb-2 font-bold">{{ loginStatus }}</h3>
    <form class="flex flex-col gap-3" @submit="onSubmit" :validation-schema="validationSchema">
      <CustomInput v-show="isSignUp" placeholder="Username" type="text" name="username" />
      <CustomInput placeholder="Email" type="email" name="email" />
      <CustomInput placeholder="Password" type="password" name="password" />
      <CustomInput v-show="isSignUp" placeholder="Confirm password" type="password" name="confirm_password" />
      <p v-show="errorMessage" class="text-error">{{ errorMessage }}</p>
      <div class="flex flex-col md:flex-row justify-between">
        <div class="flex items-center gap-1">
          <input type="checkbox" v-model="persisting" name="remember" id="remember">
          <label for="remember">Remember Me</label>
        </div>
        <div>
          <CustomButton variation="flat" text="Recovery" />
        </div>
      </div>
      <CustomButton type="submit" text="Confirm" is-full />
      <CustomButton variation="outlined" @click="signInWithGoogle" text="Continue with Google" is-full />
      <div>
        <span class="mr-1">Not registered yet?</span>
        <CustomButton @click="isSignUpToggle" variation="flat" :text="loginOppositeStatus" />
      </div>
    </form>
  </div>
</template>