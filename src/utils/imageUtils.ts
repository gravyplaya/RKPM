/**
 * Utility functions for handling image URLs in the application
 */

/**
 * Normalizes an image URL to ensure it works properly with Next.js Image component
 * @param url - The image URL to normalize
 * @param fallback - Fallback image URL if the provided URL is invalid
 * @returns Normalized image URL
 */
export function normalizeImageUrl(
  url: string | null | undefined,
  fallback: string = "/images/not-found/no-results.png"
): string {
  if (!url) return fallback;

  // If it's already a valid absolute URL, return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a relative URL starting with /, return as-is
  if (url.startsWith("/")) {
    return url;
  }

  // If it's a relative URL without leading slash, add it
  return `/${url}`;
}

/**
 * Determines if an image should be optimized by Next.js Image component
 * @param url - The image URL to check
 * @returns true if the image should be optimized, false otherwise
 */
export function shouldOptimizeImage(url: string): boolean {
  // Don't optimize localhost URLs or problematic file extensions
  if (url.includes("localhost") || url.includes(".MP.")) {
    return false;
  }

  // Don't optimize external URLs that might have CORS issues
  if (url.startsWith("http://") && !url.includes("localhost")) {
    return false;
  }

  return true;
}

/**
 * Gets the full image URL including the base URL if needed
 * @param url - The image URL or path
 * @param baseUrl - The base URL (defaults to NEXT_PUBLIC_PAYLOAD_URL)
 * @returns Full image URL
 */
export function getFullImageUrl(
  url: string,
  baseUrl: string = process.env.NEXT_PUBLIC_PAYLOAD_URL || ""
): string {
  if (!url) return "";

  // If it's already an absolute URL, return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If we have a base URL and the URL is relative, combine them
  if (baseUrl && !url.startsWith("/")) {
    return `${baseUrl.replace(/\/$/, "")}/${url}`;
  }

  return url;
}
