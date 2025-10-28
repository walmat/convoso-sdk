# Contributing to Convoso SDK

Thank you for considering contributing to the Convoso SDK! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/your-username/convoso-sdk.git
cd convoso-sdk
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run tests**

```bash
pnpm test
```

## Development Workflow

1. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**

- Write code following the existing style
- Add tests for new features
- Update documentation as needed

3. **Run CI checks locally**

```bash
pnpm ci
```

This runs:

- Linting with Biome
- Type checking with TypeScript
- Tests with Vitest
- Build to ensure no compilation errors

4. **Commit your changes**

```bash
git add .
git commit -m "feat: add your feature description"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

5. **Push and create a pull request**

```bash
git push origin feature/your-feature-name
```

## Code Style

We use Biome for linting and formatting:

```bash
# Check for issues
pnpm lint

# Auto-fix issues
pnpm lint:fix

# Format code
pnpm format
```

## Testing

- Write tests for all new features and bug fixes
- Maintain or improve code coverage
- Run tests in watch mode during development:

```bash
pnpm test:watch
```

## Project Structure

```
convoso-sdk/
├── src/
│   ├── client/          # HTTP client and main SDK client
│   ├── resources/       # API resource classes
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── tests/               # Test files
└── examples/            # Usage examples
```

## Pull Request Guidelines

- Fill out the PR template completely
- Link related issues
- Ensure all CI checks pass
- Keep PRs focused on a single feature or fix
- Update documentation for public API changes

## Questions?

Feel free to open an issue for any questions or concerns!
