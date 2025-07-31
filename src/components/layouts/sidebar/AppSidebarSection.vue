<template>
    <SidebarGroup>
        <SidebarGroupLabel>{{ label }}</SidebarGroupLabel>
        <SidebarGroupContent>
            <slot />
        </SidebarGroupContent>
    </SidebarGroup>
</template>

<script setup lang="ts">
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';

defineProps<{ label: string }>();
</script>
