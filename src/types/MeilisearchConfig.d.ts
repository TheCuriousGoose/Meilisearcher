export interface MeilisearchConfig {
    name: string;
    slug: string;
    status: 'up' | 'down' | 'unknown';
    url: string;
    port: number;
    masterKey?: string;
}