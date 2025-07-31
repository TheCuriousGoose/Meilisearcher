<template>
    <SidebarGroup>
        <SidebarGroupLabel>{{ label }}</SidebarGroupLabel>
        <SidebarGroupContent>
            <SidebarMenu>
                <slot />
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
</template>

<script setup lang="ts">
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
} from '@/components/ui/sidebar';

defineProps<{ label: string }>();
</script>
