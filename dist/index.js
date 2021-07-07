"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const exists = (path) => {
    try {
        fs_1.accessSync(path);
        console.log(`path: ${path} exists, ignoring default lint file copy`);
        return true;
    }
    catch (_a) {
        return false;
    }
};
const command = `yarn add -D eslint eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin -E`;
const argv = yargs.command('$0', 'the default command', () => {
    return;
}, (argv) => {
    child_process_1.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    console.log(command);
    const lintFiles = ['.eslintrc.js', '.prettierrc'];
    if (!exists(path_1.join(process.cwd(), lintFiles[0]))) {
        fs_1.copyFileSync(require.resolve(`iusllint/lintfiles/${lintFiles[0]}`), path_1.join(process.cwd(), lintFiles[0]));
    }
    if (!exists(path_1.join(process.cwd(), lintFiles[1]))) {
        fs_1.copyFileSync(require.resolve(`iusllint/lintfiles/${lintFiles[1]}`), path_1.join(process.cwd(), lintFiles[1]));
    }
}).argv;
//# sourceMappingURL=index.js.map