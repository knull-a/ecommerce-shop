<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRefs } from 'vue';
type Props = {
    type: string
    value?: string
    placeholder?: string
    label?: string
    name?: string
}

const props = defineProps<Props>()

// const inputName = computed(() => props.name ?? '')

const name = toRefs(() => props.name);

const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {
    initialValue: props.value,
});

</script>
<template>
    <div class="" :class="{ 'border border-error': !!errorMessage }">
        <label :for="name">{{ label }}</label>
        <input :name="name" :type="type" :value="inputValue" :placeholder="placeholder" @input="handleChange"
            @blur="handleBlur" />

        <p class="" v-show="errorMessage">
            {{ errorMessage }}
        </p>
    </div>
</template>
<style scoped></style>