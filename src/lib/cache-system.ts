import { createHash } from "crypto";

interface CacheEntry {
  data: any;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export function generateCacheKey(body: any): string {
  // Create a stable hash based on main fields (ignoring slight image changes if we want, but let's hash all input for safety, except we might trim image to just first 50 chars to save time)
  const hashObj = {
    name: body.name || "",
    weight: body.weight || "",
    dimensions: body.dimensions || "",
    material: body.material || "",
    condition: body.condition || "",
    history: body.history || "",
    origin: body.origin || "",
    // Just hash a slice of the first image to detect exact same uploads
    imageHash: body.images && body.images.length > 0 ? body.images[0].substring(0, 500) : ""
  };
  
  return createHash("sha256").update(JSON.stringify(hashObj)).digest("hex");
}

export function getCachedResult(key: string): any | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    memoryCache.delete(key);
    return null;
  }
  
  return entry.data;
}

export function setCachedResult(key: string, data: any): void {
  memoryCache.set(key, {
    data,
    timestamp: Date.now()
  });
}
