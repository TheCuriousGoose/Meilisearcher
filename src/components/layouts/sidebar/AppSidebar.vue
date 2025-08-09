<template>
    <Sidebar>
        <AppSidebarHeader />
        <SidebarContent>
            <AppSidebarGroup label="Configurations">
                <AppSidebarMenuItem to="/config/new">
                    <template #default>
                        <Plus class="w-4 h-4 mr-2" />
                        <span>Add New</span>
                    </template>
                </AppSidebarMenuItem>
                <AppSidebarMenuItem v-for="config in configs" :key="config.slug" :to="`/config/${config.slug}`">
                    <template #default>
                        {{ config.name }}
                        <SidebarMenuBadge>
                            <span class="w-3 h-3 rounded-full" :class="{
                                'bg-green-500': config.status === 'up',
                                'bg-yellow-500': config.status === 'unknown',
                                'bg-red-500': config.status === 'down'
                            }"></span>
                        </SidebarMenuBadge>
                    </template>
                </AppSidebarMenuItem>
            </AppSidebarGroup>
        </SidebarContent>
    </Sidebar>
</template>

<script setup lang="ts">
import {
    Sidebar,
    SidebarContent,
    SidebarMenuBadge,
} from '@/components/ui/sidebar';
import type { MeilisearchConfig } from '@/types/MeilisearchConfig';
import { onMounted, ref } from 'vue';

import AppSidebarHeader from './AppSidebarHeader.vue';
import AppSidebarGroup from './AppSidebarGroup.vue';
import AppSidebarMenuItem from './AppSidebarMenuItem.vue';

import { Plus } from 'lucide-vue-next';

const configs = ref<MeilisearchConfig[]>([]);

onMounted(() => {
    const meilisearchConfig = localStorage.getItem('meilisearchConfig');
    if (meilisearchConfig) {
        configs.value = JSON.parse(meilisearchConfig) as MeilisearchConfig[];
    }
});


</script>