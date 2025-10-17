# Contributing to Vetra UI

Thank you for your interest in contributing to Vetra UI! We appreciate your help in making this template better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, browser)

### Suggesting Features

We love new ideas! Please create an issue with:
- A clear description of the feature
- Why this feature would be useful
- Possible implementation approach
- Examples or mockups (if applicable)

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `pnpm install`
3. **Make your changes**
4. **Test your changes**: `pnpm build` and verify the output
5. **Commit your changes** with a clear commit message
6. **Push to your fork** and submit a pull request

#### Pull Request Guidelines

- Follow the existing code style
- Keep changes focused and atomic
- Update documentation if needed
- Add comments for complex logic
- Test your changes thoroughly

## Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run with Docker
docker build -t vetra-ui .
docker run -p 80:80 vetra-ui
```

## Code Style

- Use TypeScript for all components
- Follow the existing component structure
- Use Tailwind CSS for styling
- Keep components modular and reusable
- Use meaningful variable and function names
- Add TypeScript types for all props

## Component Guidelines

- Place new components in `components/`
- UI primitives go in `components/ui/`
- Use Framer Motion for animations
- Ensure responsive design (mobile-first)
- Follow glassmorphism design patterns

## Commit Messages

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Example: `feat: add dark mode toggle component`

## Questions?

Feel free to open an issue for any questions or join discussions!

## License

By contributing, you agree that your contributions will be licensed under the iptpodate License.
