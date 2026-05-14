# Power BI Studio MCP Server Configuration for Copilot

A comprehensive GitHub Copilot cloud agent setup with **Power BI Studio MCP server**, REST API integration, Docker support, and CI/CD pipeline.

## 🎯 Features

- **Power BI Integration**: Complete REST API client for Power BI operations
- **Copilot Setup**: Automated environment configuration via `copilot-setup-steps.yml`
- **Docker Support**: Containerized development and testing environments
- **CI/CD Pipeline**: Automated testing, linting, and Docker builds
- **Authentication**: Secure Azure AD authentication with token management
- **Performance Testing**: Built-in performance monitoring tools
- **API Tests**: Comprehensive test suites for authentication, APIs, and performance

## 📁 Directory Structure

```
.
├── .github/
│   └── workflows/
│       ├── copilot-setup-steps.yml    # Copilot cloud agent configuration
│       └── ci-cd.yml                   # GitHub Actions CI/CD pipeline
├── src/
│   └── powerbi-api.js                  # Power BI REST API client
├── tests/
│   ├── auth.test.js                    # Authentication tests
│   ├── powerbi-api.test.js             # API integration tests
│   └── performance.test.js             # Performance benchmarks
├── Dockerfile                          # Production image
├── Dockerfile.test                     # Testing image
├── docker-compose.yml                  # Local development stack
├── package.json                        # Node.js dependencies
├── .env.example                        # Environment template
└── README.md                           # This file
```

## 🚀 Quick Start

### 1. Local Development with Docker

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your Power BI credentials
nano .env

# Start development environment
npm run dev

# Run tests
npm test

# Stop services
npm run dev:stop
```

### 2. GitHub Setup

1. **Create a GitHub repository**
   ```bash
   git remote add origin https://github.com/RegaVMullen/powerbi-mcp-copilot.git
   git branch -M main
   git push -u origin main
   ```

2. **Configure Environment Variables** in GitHub:
   - Go to **Settings** → **Environments** → **copilot**
   - Add secrets:
     - `POWERBI_CLIENT_ID`
     - `POWERBI_CLIENT_SECRET`
   - Add variables:
     - `POWERBI_TENANT_ID`
     - `POWERBI_WORKSPACE_ID`

3. **Verify Setup**:
   - Go to **Actions** → **Copilot Setup Steps**
   - Click **Run workflow**

## 🔐 Power BI Authentication

### Getting Credentials

1. Go to [Azure Portal](https://portal.azure.com)
2. Register an application in **Azure AD**
3. Create a client secret
4. Grant Power BI API permissions
5. Note the Client ID, Client Secret, and Tenant ID

### Environment Variables

| Variable | Type | Description |
|----------|------|-------------|
| `POWERBI_CLIENT_ID` | Secret | Azure AD application ID |
| `POWERBI_CLIENT_SECRET` | Secret | Application client secret |
| `POWERBI_TENANT_ID` | Variable | Azure AD tenant ID |
| `POWERBI_WORKSPACE_ID` | Variable | Default Power BI workspace ID |
| `POWERBI_API_VERSION` | Variable | API version (default: v1.0) |

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Specific Tests

```bash
# Authentication tests
npm run test:auth

# API integration tests
npm test

# Performance tests
npm run test:perf
```

### Test Coverage

- **Authentication**: Azure AD token acquisition and refresh
- **API Methods**: Workspaces, reports, datasets, refresh operations
- **Performance**: Response times and concurrent request handling

## 🐳 Docker

### Build Images

```bash
# Production image
docker build -t powerbi-mcp:latest .

# Test image
docker build -f Dockerfile.test -t powerbi-mcp:test .
```

### Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📊 Power BI API Client

The `PowerBIAPI` class in `src/powerbi-api.js` provides:

```javascript
const PowerBIAPI = require('./src/powerbi-api');

const api = new PowerBIAPI();

// Get all workspaces
const workspaces = await api.getWorkspaces();

// Get reports in a workspace
const reports = await api.getReports(workspaceId);

// Get datasets in a workspace
const datasets = await api.getDatasets(workspaceId);

// Refresh a dataset
await api.refreshDataset(workspaceId, datasetId);
```

## 🔄 CI/CD Pipeline

The `.github/workflows/ci-cd.yml` workflow:

1. **Linting**: Code quality checks
2. **Authentication Tests**: Verify Power BI credentials
3. **API Tests**: Test all API endpoints
4. **Performance Tests**: Benchmark operations
5. **Docker Build**: Build and cache container image

Triggered on:
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

## 🛠️ Customization

### Adding Dependencies

Edit `package.json` and update `copilot-setup-steps.yml`:

```yaml
- name: Install custom package
  run: npm install custom-package
```

### Changing Node Version

In `.github/workflows/copilot-setup-steps.yml`:

```yaml
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "18"  # Change version
```

### Adding More API Methods

Extend `src/powerbi-api.js` with additional Power BI API calls:

```javascript
async getDatasetRefreshHistory(workspaceId, datasetId) {
  const token = await this.authenticate();
  const response = await axios.get(
    `${this.baseUrl}/myorg/groups/${workspaceId}/datasets/${datasetId}/refreshes`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.value;
}
```

## 📚 References

- [GitHub Copilot Cloud Agent Documentation](https://docs.github.com/copilot/customizing-copilot/customizing-copilot-cloud-agent)
- [Power BI REST API](https://learn.microsoft.com/en-us/rest/api/power-bi/)
- [Azure AD Authentication](https://learn.microsoft.com/en-us/azure/active-directory/develop/)
- [GitHub Actions](https://docs.github.com/actions)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Submit a pull request

## 📝 License

MIT

## ⚠️ Security

- Never commit `.env` or credentials
- Use GitHub Secrets for sensitive data
- Rotate credentials regularly
- Enable audit logging in Azure AD
