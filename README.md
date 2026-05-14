# Power BI Studio MCP Server Configuration for Copilot

This repository demonstrates how to configure the **Power BI Studio MCP server** for the GitHub Copilot cloud agent.

## Setup Overview

The `copilot-setup-steps.yml` workflow file in `.github/workflows/` configures Copilot's development environment with the Power BI Studio MCP server.

## Files Structure

```
.
├── .github/
│   └── workflows/
│       └── copilot-setup-steps.yml     # Copilot setup configuration
├── package.json                         # Node.js dependencies
└── README.md                            # This file
```

## Configuration Details

### copilot-setup-steps.yml

This workflow:
1. Checks out your repository
2. Sets up Node.js 20
3. Installs project dependencies via npm
4. Installs the Power BI Studio MCP server package
5. Verifies the installation

### Environment Variables (GitHub Actions)

To configure Power BI authentication for Copilot, add the following to your repository's **Environments** settings:

1. Go to **Settings** → **Environments**
2. Create or select the **`copilot`** environment
3. Add these environment variables/secrets:

- `POWERBI_CLIENT_ID` (Secret) - Your Power BI application ID
- `POWERBI_CLIENT_SECRET` (Secret) - Your Power BI client secret
- `POWERBI_TENANT_ID` (Variable) - Your Azure AD tenant ID
- `POWERBI_WORKSPACE_ID` (Variable) - Default Power BI workspace ID (optional)

## Next Steps

1. **Push this to GitHub**: Create a repository and push these files to your default branch
2. **Configure Power BI Credentials**: Add the environment variables mentioned above to your `copilot` environment
3. **Run the Workflow**: Go to **Actions** tab and manually run `copilot-setup-steps` to verify it works
4. **Start Using Copilot**: Copilot will now have access to the Power BI Studio MCP server

## Customization

### Adding More Tools/Dependencies

Edit `.github/workflows/copilot-setup-steps.yml` and add additional steps as needed:

```yaml
- name: Install additional tool
  run: npm install some-other-package
```

### Using a Different Node Version

In `copilot-setup-steps.yml`, change the `node-version` to your required version:

```yaml
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "18"  # Change this
```

## Troubleshooting

If the setup steps fail:

1. Check the **Actions** tab in your repository for detailed logs
2. Verify environment variables are set correctly in the `copilot` environment
3. Ensure all required permissions are granted
4. Check that `@powerbi/mcp-server` is the correct package name and is available on npm

## References

- [Customizing Copilot Cloud Agent](https://docs.github.com/copilot/customizing-copilot/customizing-copilot-cloud-agent)
- [GitHub Actions Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
