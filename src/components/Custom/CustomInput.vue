<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRefs, ref, toRef } from 'vue';
type Props = {
    type?: string
    value?: string
    placeholder?: string
    label?: string
    name: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text'
})

// const inputName = computed(() => props.name ?? '')

const name = toRef(props, 'name')

const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {
    initialValue: props.value,
    validateOnValueUpdate: false
});

</script>
<template>
    <div class="w-full">
        <label :for="name">{{ label }}</label>
        <input class="w-full outline-none rounded-md bg-grey-2 py-3 px-4" :class="{ 'border border-error': !!errorMessage }"
            :name="name" :id="name" :type="type" :value="inputValue" :placeholder="placeholder" @input="handleChange"
            @blur="handleBlur" />
    </div>
</template>
<style scoped></style>
