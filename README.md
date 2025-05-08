# GitHub Copilot Freedom Typescript 

A utility tool to enable unrestricted features in GitHub Copilot Chat extensions.

**Use at your own risk. This tool modifies extension files which may violate GitHub Copilot's terms of service.** 

## What It Does

This tool scans your VS Code extensions directory (or custom specified path) for GitHub Copilot Chat installations and modifies them to:

1. Enable all models for LM API usage by removing authentication restrictions
2. Enable BYOK (Bring Your Own Key) feature for Business and Enterprise users
3. Enable CodeReview features for free users

## How to Use

```bash

# Or use curl
curl -fsSL https://raw.githubusercontent.com/kunihir0/adsf34/refs/heads/master/github-copilot-freedom.ts -o temp.ts && bun run temp.ts && rm temp.ts
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
