<template>
    <SidebarMenuItem>
        <RouterLink :to="props.to">
            <SidebarMenuButton>
                <slot />
            </SidebarMenuButton>
        </RouterLink>
    </SidebarMenuItem>
</template>

<script setup lang="ts">
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const props = defineProps<{ to: string }>();
</script>
