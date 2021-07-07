"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs_1 = require("fs");
const path_1 = require("path");
const asyncExec = util_1.promisify(child_process_1.exec);
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
        try {
            fs_1.copyFileSync(require.resolve(`iusllint/lintfiles/${file}`), path_1.join(process.cwd(), file));
        }
        catch (e) {
            console.log(e);
        }
    }
};
const argv = yargs.command('$0', 'the default command', (yargs) => {
    return yargs.options({
        t: {
            alias: 'typescript',
            describe: 'generate aditional standard tsconfig.json',
            type: 'boolean',
        },
        ts: {
            alias: 'tsdev',
            describe: 'generate aditional standard tsconfig.json and installs basic typescript dev env',
            type: 'boolean',
        },
    });
}, async (argv) => {
    console.log(command);
    await asyncExec(command).then(console.log).catch(console.log);
    genFile(LintFiles.eslintrc);
    genFile(LintFiles.prettierrc);
    if (argv.t) {
        genFile(LintFiles.tsconfig);
    }
    if (argv.ts) {
        genFile(LintFiles.tsconfig);
        console.log(tCommand);
        await asyncExec(tCommand).then(console.log).catch(console.log);
    }
}).argv;
//# sourceMappingURL=index.js.map