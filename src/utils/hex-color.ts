/**
 * Validates and normalizes hex color by removing # prefix if present
 *
 * @param hexColor - Hex color string, optionally prefixed with #
 * @returns Normalized hex color without # prefix, or undefined if input is undefined
 *
 * @example
 * ```typescript
 * normalizeHexColor("#6711d1") // Returns "6711d1"
 * normalizeHexColor("6711d1")  // Returns "6711d1"
 * normalizeHexColor(undefined) // Returns undefined
 * ```
 */
export function normalizeHexColor(hexColor?: string): string | undefined {
  if (!hexColor) return undefined;
  return hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;
}
