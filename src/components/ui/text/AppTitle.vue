<template>
	<component
		:is="asTag"
		:class="computedClass"
	>
		<slot />
	</component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	as: {
		type: String,
		default: 'h4',
		validator: (val: string) => ['h1','h2','h3','h4','h5','h6'].includes(val)
	},
	class: {
		type: String,
		default: ''
	},
	size: {
		type: String,
		default: 'sm', // sm, md, lg, xl
	},
	weight: {
		type: String,
		default: 'medium', // normal, medium, bold
	},
	color: {
		type: String,
		default: 'foreground', // foreground, muted-foreground, etc.
	}
});

const asTag = computed(() => props.as);

const sizeClasses: Record<string, string> = {
	sm: 'text-sm',
	md: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl',
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
	weightClasses[props.weight] || weightClasses.medium,
	colorClasses[props.color] || colorClasses.foreground,
	'leading-none',
	props.class
].join(' '));
</script>
