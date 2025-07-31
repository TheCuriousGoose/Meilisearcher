export interface MeilisearchConfig {
    name: string;
    status: 'up' | 'down' | 'unknown';
    host: string;
    apiKey?: string;
}