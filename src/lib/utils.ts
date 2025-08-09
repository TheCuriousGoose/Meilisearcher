import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces and special characters with hyphens
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Ensure it's not empty
    || 'config'
}

/**
 * Generate a unique slug by checking against existing configs
 * @param baseName - The base name to generate slug from
 * @param existingConfigs - Array of existing configurations
 * @returns A unique slug
 */
export function generateUniqueSlug(baseName: string, existingConfigs: Array<{ slug: string }>): string {
  const baseSlug = generateSlug(baseName)
  let slug = baseSlug
  let counter = 1
  
  // Check if slug already exists and append number if needed
  while (existingConfigs.some(config => config.slug === slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }
  
  return slug
}
