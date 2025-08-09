<template>
    <GuestLayout>
        <div class="space-y-6 p-4 pb-16 md:block">
            <div v-if="config" class="space-y-0.5">
                <Title as="h1" size="xl" weight="bold">{{ config.name }}</Title>
                <Paragraph>
                    Configuration details for your Meilisearch instance.
                </Paragraph>
            </div>
            <div v-else class="space-y-0.5">
                <Title as="h1" size="xl" weight="bold">Configuration Not Found</Title>
                <Paragraph>
                    The requested configuration could not be found.
                </Paragraph>
            </div>
            <Separator />
            
            <div v-if="config" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium">Name</label>
                        <div class="p-3 border rounded-md bg-muted">{{ config.name }}</div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="text-sm font-medium">Slug</label>
                        <div class="p-3 border rounded-md bg-muted">{{ config.slug }}</div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="text-sm font-medium">URL</label>
                        <div class="p-3 border rounded-md bg-muted">{{ config.url }}</div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="text-sm font-medium">Port</label>
                        <div class="p-3 border rounded-md bg-muted">{{ config.port }}</div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="text-sm font-medium">Master Key</label>
                        <div class="p-3 border rounded-md bg-muted">
                            {{ config.masterKey ? '••••••••••••' : 'Not configured' }}
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="text-sm font-medium">Status</label>
                        <div class="flex items-center gap-2 p-3 border rounded-md bg-muted">
                            <span class="w-3 h-3 rounded-full" :class="{
                                'bg-green-500': config.status === 'up',
                                'bg-yellow-500': config.status === 'unknown',
                                'bg-red-500': config.status === 'down'
                            }"></span>
                            <span class="capitalize">{{ config.status }}</span>
                        </div>
                    </div>
                </div>
                
                <div class="flex gap-4 pt-4">
                    <Button @click="testConnection">
                        Test Connection
                    </Button>
                    <Button variant="outline" @click="goBack">
                        Back to Configurations
                    </Button>
                </div>
            </div>
            
            <div v-else class="flex gap-4 pt-4">
                <Button @click="goBack">
                    Back to Configurations
                </Button>
            </div>
        </div>
    </GuestLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import { useBreadcrumb } from '@/composables/useBreadcrumb';
import { Title, Paragraph } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import type { MeilisearchConfig } from '@/types/MeilisearchConfig';

const route = useRoute();
const router = useRouter();
const config = ref<MeilisearchConfig | null>(null);

onMounted(() => {
    const slug = route.params.slug as string;
    loadConfiguration(slug);
});

const loadConfiguration = (slug: string) => {
    const meilisearchConfig = localStorage.getItem('meilisearchConfig');
    if (meilisearchConfig) {
        const configs: MeilisearchConfig[] = JSON.parse(meilisearchConfig);
        const foundConfig = configs.find(c => c.slug === slug);
        if (foundConfig) {
            config.value = foundConfig;
        }
    }
};

const testConnection = async () => {
    if (!config.value) return;
    
    toast.info('Testing connection...');
    
    try {
        const url = `${config.value.url}:${config.value.port}/health`;
        const response = await fetch(url, {
            method: 'GET',
            headers: config.value.masterKey ? {
                'Authorization': `Bearer ${config.value.masterKey}`
            } : {}
        });
        
        if (response.ok) {
            toast.success('Connection successful!');
            // Update status in localStorage
            updateConfigStatus(config.value.slug, 'up');
        } else {
            toast.error('Connection failed!');
            updateConfigStatus(config.value.slug, 'down');
        }
    } catch (error) {
        toast.error('Connection failed!');
        updateConfigStatus(config.value.slug, 'down');
    }
};

const updateConfigStatus = (slug: string, status: 'up' | 'down' | 'unknown') => {
    const meilisearchConfig = localStorage.getItem('meilisearchConfig');
    if (meilisearchConfig) {
        const configs: MeilisearchConfig[] = JSON.parse(meilisearchConfig);
        const configIndex = configs.findIndex(c => c.slug === slug);
        if (configIndex !== -1) {
            configs[configIndex].status = status;
            localStorage.setItem('meilisearchConfig', JSON.stringify(configs));
            if (config.value) {
                config.value.status = status;
            }
        }
    }
};

const goBack = () => {
    router.push('/');
};

useBreadcrumb({
    title: config.value?.name || 'Configuration',
    breadcrumbs: [
        {
            name: config.value?.name || 'Configuration',
            path: `/config/${route.params.slug}`,
        }
    ]
});
</script>