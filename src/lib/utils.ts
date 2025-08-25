import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export function generateUniqueSlug(baseName: string, existingConfigs: Array<{ slug: string }>): string {
  const baseSlug = generateSlug(baseName)
  let slug = baseSlug
  let counter = 1
  
  while (existingConfigs.some(config => config.slug === slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }
  
  return slug
}
