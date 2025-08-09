<template>
    <p :class="computedClass">
        <slot />
    </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    class: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'sm', // sm, md, lg
    },
    weight: {
        type: String,
        default: 'normal', // normal, medium, bold
    },
    color: {
        type: String,
        default: 'muted-foreground', // foreground, muted-foreground, etc.
    }
});

const sizeClasses: Record<string, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
};
const weightClasses: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
};
const colorClasses: Record<string, string> = {
    foreground: 'text-foreground',
    'muted-foreground': 'text-muted-foreground',
};

const computedClass = computed(() => [
    sizeClasses[props.size] || sizeClasses.sm,
    weightClasses[props.weight] || weightClasses.normal,
    colorClasses[props.color] || colorClasses['muted-foreground'],
    props.class
].join(' '));
</script>
