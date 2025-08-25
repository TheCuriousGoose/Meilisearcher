<template>
    <GuestLayout>
        <div class="space-y-6 p-4 pb-16 md:block">
            <div class="space-y-0.5">
                <Title as="h1" size="xl" weight="bold">Create New Configuration</Title>
                <Paragraph>
                    Create a new configuration for your Meilisearch instance.
                </Paragraph>
            </div>
            <Separator />

            <form @submit="onSubmit" class="space-y-4 max-w-4xl">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Configuration Name</FormLabel>
                        <FormControl>
                            <Input v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="url">
                    <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                            <Input v-bind="componentField" />
                        </FormControl>
                        <FormDescription>
                            The base URL of your Meilisearch instance
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="port">
                    <FormItem>
                        <FormLabel>Port</FormLabel>
                        <FormControl>
                            <Input type="number" v-bind="componentField" />
                        </FormControl>
                        <FormDescription>
                            The port number (default is 7700)
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="masterKey">
                    <FormItem>
                        <FormLabel>Master Key (Optional)</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Enter master key if required" v-bind="componentField" />
                        </FormControl>
                        <FormDescription>
                            The master key for your Meilisearch instance, if authentication is enabled. This will only
                            be stored locally
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <div class="flex gap-4 pt-4">
                    <Button type="submit" :disabled="isSubmitting || isTesting">
                        <LoaderCircle v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
                        Create Configuration
                    </Button>
                    <Button type="button" variant="outline" @click="testConnection" :disabled="isTesting">
                        <LoaderCircle v-if="isTesting" class="w-4 h-4 mr-2 animate-spin" />
                        Test Connection
                    </Button>
                    <Button type="button" variant="outline" @click="handleCancel">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    </GuestLayout>
</template>

<script setup lang="ts">
import { LoaderCircle, Plus } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import * as z from 'zod';
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import { useBreadcrumb } from '@/composables/useBreadcrumb';
import { Title, Paragraph } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { MeilisearchConfig } from '@/types/MeilisearchConfig';
import { generateUniqueSlug } from '@/lib/utils';
import { MeiliSearch } from 'meilisearch';
import { ref } from 'vue';

const isTesting = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);

const router = useRouter();

const formSchema = toTypedSchema(z.object({
    name: z.string().min(1, 'Configuration name is required'),
    url: z.string().min(1, 'URL is required').url('Please enter a valid URL'),
    port: z.number({
        required_error: 'Port is required',
        invalid_type_error: 'Port must be a number'
    }).min(1, 'Port must be greater than 0').max(65535, 'Port must be less than 65536'),
    masterKey: z.string().optional()
}));

const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        name: '',
        url: 'http://localhost',
        port: 7700,
        masterKey: ''
    }
});

const testConnection = async () => {
    isTesting.value = true;

    const isValid = await form.validate();
    if (!isValid.valid) {
        isTesting.value = false;
        toast.error('Please fix the validation errors before testing the connection.');
        return;
    }

    const meilisearchHost = form.values.url + ':' + form.values.port;

    const client = new MeiliSearch({
        host: meilisearchHost,
        apiKey: form.values.masterKey
    })

    client.health().then(() => {
        toast.success('Connection successful!');
    }).catch(() => {
        toast.error('Connection failed. Please check your settings.');
    }).finally(() => {
        isTesting.value = false;
    });
}

const onSubmit = form.handleSubmit(async (values) => {
    isSubmitting.value = true;
    try {
        const existingConfigs = localStorage.getItem('meilisearchConfig');
        let configs: MeilisearchConfig[] = [];

        if (existingConfigs) {
            configs = JSON.parse(existingConfigs);
        }

        if (configs.some(c => c.name === values.name.trim())) {
            toast.error('A configuration with this name already exists!');
            return;
        }

        const slug = generateUniqueSlug(values.name, configs);

        const config: MeilisearchConfig = {
            name: values.name.trim(),
            slug: slug,
            url: values.url.trim(),
            port: values.port,
            masterKey: values.masterKey?.trim() || undefined,
            status: 'unknown'
        };

        configs.push(config);

        localStorage.setItem('meilisearchConfig', JSON.stringify(configs));

        toast.success('Configuration created successfully!');

        router.push(`/config/${slug}`);
    } finally {
        isSubmitting.value = false;
    }
});

const handleCancel = () => {
    router.push('/');
};

useBreadcrumb({
    title: 'Create New Configuration',
    icon: Plus,
    breadcrumbs: [
        {
            name: 'Create New Configuration',
            path: '/configs/create',
            icon: Plus
        }
    ]
});
</script>