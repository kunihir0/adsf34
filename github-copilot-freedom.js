const fs = require('fs');
const path = require('path');
const os = require('os');

// Get the root path for extensions based on the user's home directory.
const getRootPath = (customPath) => {
    const homeDir = os.homedir();
    const options = [];

    if (customPath) {
        options.push(customPath);
        console.log(`Using custom path: ${customPath}`);
    } else {
        const defaultPaths = [
            path.join(homeDir, '.vscode', 'extensions'),
            path.join(homeDir, '.vscode-server', 'extensions'),

            path.join(homeDir, '.vscode-insiders', 'extensions'),
            path.join(homeDir, '.vscode-server-insiders', 'extensions'),

            path.join(homeDir, '.cursor', 'extensions'),
            path.join(homeDir, '.cursor-server', 'extensions'),

            path.join(homeDir, '.vscode-oss', 'extensions'),
            path.join(homeDir, '.vscode-oss-dev', 'extensions'),
        ];

        defaultPaths.forEach(path => {
            if (fs.existsSync(path)) {
                options.push(path);
            }
        });
        console.log(`Using default paths: \n  ${options.join('\n  ')}`);
    }
    console.log('');
    return options;
};

// Traverse the directory and update files
const updateFilesInDirectory = (dirPath) => {
    // Check if the directory exists
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
        console.log(`Directory does not exist: ${dirPath}`);
        console.log('');
        return;
    }
    
    let modifiedCount = 0; // Count the number of modified files
    fs.readdirSync(dirPath).forEach(file => {
        const fullPath = path.join(dirPath, file);
        // Check if it's a directory and starts with 'github.copilot-chat-' but not including version number directories
        const versionPattern = /^github\.copilot-chat-\d+\.\d+\.\d+$/; // Matches version number format
        if (fs.statSync(fullPath).isDirectory() && file.startsWith('github.copilot-chat-') && versionPattern.test(file)) {
            console.log(`Processing directory: ${fullPath}`);
            // Find the target directory, update the file
            const filesToUpdate = [
                path.join(fullPath, 'dist', 'extension.js'),
            ];
            filesToUpdate.forEach(fileToUpdate => {
                if (updateFile(fileToUpdate)) {
                    modifiedCount++; // Increase the count if the file is modified
                }
            });
        }
    });
    console.log(`Total modified files in directory ${dirPath}: ${modifiedCount}`); // Print the total number of modified files
    console.log('');
};

// Read file
const updateFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content; // Save original content

    let backupFilePath = `${filePath}.bak`;
    if (fs.existsSync(backupFilePath)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        backupFilePath += `_${timestamp}`;
    }
    fs.copyFileSync(filePath, backupFilePath);
    console.log(`Backup created: ${backupFilePath}`);

    // enable  all models for LM API usage
    content = content.replace(/,"x-onbehalf-extension-id":`\$\{[a-zA-Z]+\}\/\$\{[a-zA-Z]+\}`/g, '');

    // enable BYOK feature for Business and Enterprise.
    content = content.replace(/get isIndividual\(\){return this._info\.individual\?\?!1}/g, 'get isIndividual(){return !0;this._info.individual??!1}');

    // enable CodeReview
    content = content.replace(/get isCopilotCodeReviewEnabled\(\){return this\.getTokenValue\("ccr"\)==="1"}/g, 'get isCopilotCodeReviewEnabled(){return !0}');

    // Check if content has changed and print log
    const isModified = originalContent !== content;
    if (isModified) {
        console.log(`File updated: ${filePath}`);
    } else {
        console.log(`No changes made to: ${filePath}`);
    }

    // Write back file
    fs.writeFileSync(filePath, content, 'utf-8');
    return isModified; // Return if there is any modification
};

// Main program
const customPath = process.argv[2]; // Get custom path from command line arguments
const rootPaths = getRootPath(customPath);
rootPaths.forEach(rootPath => {
    updateFilesInDirectory(rootPath);
});