# Convoso SDK

Modern TypeScript SDK for the Convoso API with full type safety and automatic retries.

## Features

- **Modern TypeScript** - Built with TypeScript 5.7+ with strict mode enabled
- **Dual ESM/CJS** - Works in both ESM and CommonJS environments
- **Type Safe** - Full TypeScript support with comprehensive types
- **Automatic Retries** - Built-in retry logic with exponential backoff
- **Error Handling** - Structured error handling with custom error types
- **Tree-shakeable** - Optimized bundle size with tree-shaking support
- **Well Tested** - Comprehensive test coverage with Vitest
- **Zero Dependencies** - No runtime dependencies for minimal bundle size

## Installation

```bash
npm install @convoso/sdk
# or
pnpm add @convoso/sdk
# or
yarn add @convoso/sdk
```

## Quick Start

```typescript
import { ConvosoClient } from "@convoso/sdk";

const client = new ConvosoClient({
  apiKey: "your-api-key",
});

// Use the client
try {
  const response = await client.http.request({
    method: "GET",
    path: "/v1/resource",
  });
  console.log(response);
} catch (error) {
  console.error("Error:", error);
}
```

## Configuration

```typescript
const client = new ConvosoClient({
  // Required
  apiKey: "your-api-key",

  // Optional
  baseUrl: "https://api.convoso.com", // Default API URL
  timeout: 30000, // Request timeout in ms (default: 30000)
  maxRetries: 3, // Max retry attempts (default: 3)
  headers: {
    // Custom headers for all requests
    "X-Custom-Header": "value",
  },
});
```

## Error Handling

The SDK provides a custom error class for API errors:

```typescript
import { ConvosoApiError } from "@convoso/sdk";

try {
  await client.http.request({
    method: "GET",
    path: "/v1/resource",
  });
} catch (error) {
  if (error instanceof ConvosoApiError) {
    console.error("Status:", error.statusCode);
    console.error("Code:", error.code);
    console.error("Message:", error.message);
    console.error("Details:", error.details);
  }
}
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm (recommended) or npm

### Setup

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run type checking
pnpm typecheck

# Lint and format
pnpm lint
pnpm format

# Build
pnpm build
```

### Project Structure

```
convoso-sdk/
├── src/
│   ├── client/          # HTTP client and main SDK client
│   ├── resources/       # API resource classes
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── tests/               # Test files
├── examples/            # Usage examples
└── dist/                # Built output
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Run `pnpm ci` to ensure all checks pass
5. Submit a pull request

## License

MIT
