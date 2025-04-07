# GitHub Copilot Freedom

A utility tool to enable unrestricted features in GitHub Copilot Chat extensions.

**Use at your own risk. This tool modifies extension files which may violate GitHub Copilot's terms of service.** 

## What It Does

This tool scans your VS Code extensions directory (or custom specified path) for GitHub Copilot Chat installations and modifies them to:

1. Enable all models for LM API usage by removing authentication restrictions
2. Enable BYOK (Bring Your Own Key) feature, which is normally restricted to Business and Enterprise users
3. Enable CodeReview features for all users

## How to Use

```bash
# Run with default paths
node github-copilot-freedom.js
# Or use curl
curl -sSL https://raw.githubusercontent.com/DaydreamCoding/github-copilot-freedom/master/github-copilot-freedom.js | node

# Run with a custom path
node github-copilot-freedom.js $HOME/.vscode/extensions
# Or use curl
curl -sSL https://raw.githubusercontent.com/DaydreamCoding/github-copilot-freedom/master/github-copilot-freedom.js > /tmp/copilot-freedom.js && node /tmp/copilot-freedom.js $HOME/.vscode/extensions
```

## Default Paths Checked

The tool automatically checks the following paths for VS Code extensions:

- `~/.vscode/extensions`
- `~/.vscode-server/extensions`
- `~/.vscode-insiders/extensions`
- `~/.vscode-server-insiders/extensions`
- `~/.cursor/extensions`
- `~/.cursor-server/extensions`
- `~/.vscode-oss/extensions`
- `~/.vscode-oss-dev/extensions`

## How It Works

1. The tool identifies GitHub Copilot Chat extension directories
2. Creates a backup of the original files
3. Modifies the JavaScript code to enable restricted features
4. Reports which files have been modified
5. After modifying the extension files, you may need to restart VS Code for the changes to take effect.

## Requirements

- Node.js

## License

This repository is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
