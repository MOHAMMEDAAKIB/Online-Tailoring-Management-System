# Contributing to Online Tailoring Management System

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Process](#development-process)
4. [Coding Standards](#coding-standards)
5. [Testing Guidelines](#testing-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Security](#security)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Report unacceptable behavior

## Getting Started

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:
```bash
git clone https://github.com/your-username/Online-Tailoring-Management-System.git
cd Online-Tailoring-Management-System
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/MOHAMMEDAAKIB/Online-Tailoring-Management-System.git
```

### Setup Development Environment

Follow the [SETUP.md](SETUP.md) guide to configure your local environment.

## Development Process

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

### 2. Make Changes

- Write clean, readable code
- Follow coding standards
- Add comments for complex logic
- Update documentation if needed

### 3. Commit Changes

Write clear commit messages:

```bash
git add .
git commit -m "Add feature: user profile photo upload"
```

Good commit message format:
```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Example:
```
feat: Add measurement estimation from photos

- Implement image upload functionality
- Add AI model integration
- Create measurement preview component

Closes #123
```

### 4. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

### 5. Push Changes

```bash
git push origin feature/your-feature-name
```

## Coding Standards

### JavaScript/Node.js

- Use ES6+ features
- Use const/let, avoid var
- Use arrow functions when appropriate
- Use async/await for promises
- Handle errors properly

Good:
```javascript
const getUserById = async (id) => {
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return users[0];
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};
```

Bad:
```javascript
var getUserById = function(id) {
  pool.query('SELECT * FROM users WHERE id = ' + id, function(err, users) {
    if (err) throw err;
    return users[0];
  });
}
```

### React

- Use functional components
- Use hooks (useState, useEffect, etc.)
- Extract reusable components
- Use meaningful component names

Good:
```javascript
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await authService.getProfile();
      setUser(response.data.user);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
};
```

### API Design

- Use RESTful conventions
- Use proper HTTP methods
- Return consistent response format
- Include proper error messages
- Document all endpoints

### Database

- Use prepared statements (prevent SQL injection)
- Index frequently queried columns
- Use transactions for multiple related operations
- Clean up resources (close connections)

## Testing Guidelines

### Backend Tests

Place tests in `backend/tests/`:

```javascript
describe('Order Management', () => {
  it('should create an order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        measurement_id: 1,
        order_type: 'shirt',
        fabric_type: 'Cotton'
      })
      .expect(201);

    expect(response.body.orderId).toBeDefined();
  });
});
```

### Frontend Tests

Place tests in `frontend/src/__tests__/`:

```javascript
import { render, screen, fireEvent } from './test-utils';
import Login from '../pages/Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});
```

### Running Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test

# Coverage
npm test -- --coverage
```

## Pull Request Process

### 1. Ensure Quality

Before submitting:
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No console errors
- [ ] No linting errors
- [ ] Documentation is updated
- [ ] Commit messages are clear

### 2. Create Pull Request

1. Push to your fork
2. Go to original repository
3. Click "New Pull Request"
4. Select your branch
5. Fill in PR template

### 3. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing done

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Code follows style guide
- [ ] No new warnings
```

### 4. Review Process

- Maintainers will review your PR
- Address feedback
- Make requested changes
- Push updates to same branch
- PR will be merged when approved

### 5. After Merge

```bash
git checkout main
git pull upstream main
git push origin main
```

## Security

### Reporting Vulnerabilities

If you find a security vulnerability:
1. Do NOT open a public issue
2. Email the maintainers directly
3. Include details and steps to reproduce
4. Wait for response before disclosure

### Security Checklist

- [ ] No hardcoded credentials
- [ ] Input validation
- [ ] Output encoding
- [ ] Parameterized queries
- [ ] Proper authentication
- [ ] HTTPS in production
- [ ] Dependency vulnerabilities checked

## What to Contribute

### Good First Issues

Look for issues labeled:
- `good first issue`
- `help wanted`
- `documentation`

### Areas Needing Help

- **Documentation**: Improve guides, add examples
- **Tests**: Increase test coverage
- **Bug Fixes**: Fix reported issues
- **Features**: Implement requested features
- **Performance**: Optimize slow operations
- **Security**: Improve security measures

### Feature Requests

Before adding new features:
1. Open an issue to discuss
2. Wait for approval
3. Implement and submit PR

## Communication

- **GitHub Issues**: Bug reports, feature requests
- **Pull Requests**: Code contributions
- **Discussions**: Questions, ideas

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

## Questions?

If you have questions:
1. Check existing documentation
2. Search closed issues
3. Open a new issue
4. Ask in discussions

Thank you for contributing! 🎉
