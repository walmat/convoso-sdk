# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern TypeScript SDK for the Convoso API with zero runtime dependencies. It's designed to be tree-shakeable, fully type-safe, and compatible with both ESM and CommonJS environments.

## Development Commands

### Building and Testing
- `pnpm build` - Build the SDK using tsup (outputs to `dist/` with ESM and CJS formats)
- `pnpm dev` - Build in watch mode for development
- `pnpm test` - Run tests with Vitest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate test coverage report
- `pnpm typecheck` - Run TypeScript type checking without emitting files

### Linting and Formatting
- `pnpm lint` - Check code with Biome (linter and formatter)
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm format` - Format code with Biome

### CI/CD
- `pnpm ci` - Run all checks (lint, typecheck, test, build) - must pass before merging

## Architecture

### Core Components

**HttpClient** (`src/client/http-client.ts`)
- Handles all HTTP communication with the Convoso API
- Implements automatic retry logic with exponential backoff (default: 3 retries)
- Retries on 429 (rate limit) and 5xx errors only
- Uses native `fetch` API with AbortController for timeouts (default: 30s)
- Auth token is automatically appended to all requests as a query parameter
- Throws `ConvosoApiError` for error handling

**ConvosoClient** (`src/client/convoso-client.ts`)
- Main SDK entry point that users instantiate
- Accepts `ConvosoClientConfig` with apiKey (required), baseUrl, timeout, maxRetries, and custom headers
- Exposes resource accessors as getters (e.g., `client.leads`, `client.campaigns`)
- Each getter creates a new resource instance with the shared HttpClient

**BaseResource** (`src/resources/base-resource.ts`)
- Abstract base class for all API resource classes
- Provides common utilities:
  - `normalizeParams()` - Converts arrays to comma-separated strings for API compatibility
  - `validateOffset()` - Clamps offset to 0-50000 range
  - `validateLimit()` - Clamps limit to 1-1000 range (default: 1000)
  - `applyPaginationValidation()` - Applies both offset and limit validation
- All resource classes extend this and implement their own `basePath`

**Resource Classes** (`src/resources/`)
- Each resource (Leads, Campaigns, Users, etc.) extends BaseResource
- Methods typically use POST requests even for read operations (Convoso API design)
- Resource methods call `this.client.request()` with appropriate options

### Type System

**Type Definitions** (`src/types/`)
- Each resource has corresponding type files (e.g., `agent-monitor.ts`, `call-logs.ts`)
- Core types in `src/types/index.ts`: `ConvosoClientConfig`, `RequestOptions`, `ApiError`, `ApiResponse`
- Uses strict TypeScript settings with `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`

### Build Configuration

**tsup** (`tsup.config.ts`)
- Bundles from `src/index.ts` entry point
- Outputs both ESM (`dist/index.js`) and CJS (`dist/index.cjs`)
- Generates TypeScript declarations (`.d.ts` and `.d.cts`)
- Tree-shaking enabled, no minification by default
- Source maps enabled for debugging

**TypeScript** (`tsconfig.json`)
- Target: ES2022
- Module: ESNext with bundler resolution
- Extremely strict type checking enabled
- `noEmit: true` (actual building handled by tsup)
- `verbatimModuleSyntax: true` requires explicit `type` imports

**Biome** (`biome.json`)
- Replaces ESLint and Prettier
- Enforces `useImportType` and `useExportType` as errors
- 100 character line width, 2 space indentation
- Double quotes, semicolons required, trailing commas enforced

## Key Development Patterns

### Adding New Resources

1. Create type definitions in `src/types/resource-name.ts`
2. Create resource class in `src/resources/resource-name.ts` extending `BaseResource`
3. Implement `basePath` getter and API methods
4. Use `this.normalizeParams()` for parameters with arrays
5. Use `this.applyPaginationValidation()` for paginated endpoints
6. Export resource and types from `src/index.ts`
7. Add resource getter to `ConvosoClient` class

### Import Conventions

Due to `verbatimModuleSyntax: true`, you MUST use `type` keyword for type-only imports:
```typescript
import type { SomeType } from "./types.js";  // Correct
import { SomeType } from "./types.js";        // Error if only used as type
```

All imports must include `.js` extension even for TypeScript files.

### Testing

- Tests use Vitest with globals enabled
- Place tests in `tests/` directory with `.test.ts` suffix
- Coverage excludes node_modules, dist, tests, and config files

### API Design Notes

- Convoso API uses query parameter authentication (`auth_token`) and query parameters for all params NO "POST" requests.
- Array parameters (like multiple campaign IDs) are comma-separated strings
- Pagination has hard limits: offset max 50000, limit max 1000
- Default pagination: offset=0, limit=1000
