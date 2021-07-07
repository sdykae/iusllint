"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
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
var LintFiles;
(function (LintFiles) {
    LintFiles["eslintrc"] = ".eslintrc";
    LintFiles["prettierrc"] = ".prettierrc";
    LintFiles["tsconfig"] = "tsconfig.json";
})(LintFiles || (LintFiles = {}));
const command = `yarn add -D eslint eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin -E`;
const tCommand = `yarn add -D typescript ttypescript ts-node nodemon ts-transformer-keys @types/node -E`;
const genFile = (file) => {
    if (!exists(path_1.join(process.cwd(), file))) {
        fs_1.copyFileSync(require.resolve(`iusllint/lintfiles/${file}`), path_1.join(process.cwd(), file));
    }
};
const argv = yargs_1.default.command('$0', 'the default command', (yargs) => {
    return yargs
        .option('t', {
        alias: 'typescript',
        describe: 'generate aditional standard tsconfig.json',
        type: 'boolean',
    })
        .option('ts', {
        alias: 'tsdev',
        describe: 'generate aditional standard tsconfig.json and installs basic typescript dev env',
        type: 'boolean',
    });
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
    genFile(LintFiles.eslintrc);
    genFile(LintFiles.prettierrc);
    if (argv.t) {
        genFile(LintFiles.tsconfig);
    }
    if (argv.ts) {
        genFile(LintFiles.tsconfig);
        child_process_1.exec(tCommand, (error, stdout, stderr) => {
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
    }
}).argv;
//# sourceMappingURL=index.js.map