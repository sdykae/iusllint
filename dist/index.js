#!/usr/bin/env node
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
const addD = `yarn add -D`;
const lintPackages = `eslint eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin`;
const typescriptDevPackages = `typescript ttypescript ts-node nodemon ts-transformer-keys @types/node`;
const utilyPackages = `rimraf`;
const addOptions = `-E`;
const start = `nodemon --watch \"src/**\" --ext \"ts,json,env\" --ignore \"src/**/*.spec.ts\" --exec \"ts-node src/index.ts\"`;
const main = 'src/index.ts';
const prebuild = 'rimraf dist';
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
        tsc: {
            alias: 'tsdevfull',
            describe: 'generate aditional standard tsconfig.json and installs basic typescript dev env, utilities, and sets scripts',
            type: 'boolean',
        },
    });
}, async (argv) => {
    if (Object.keys(argv).length === 2) {
        const command = `${addD} ${lintPackages} ${addOptions}`;
        console.log(command);
        await asyncExec(command).then(console.log).catch(console.log);
        genFile(LintFiles.eslintrc);
        genFile(LintFiles.prettierrc);
    }
    if (argv.t) {
        const command = `${addD} ${lintPackages} ${addOptions}`;
        console.log(command);
        await asyncExec(command).then(console.log).catch(console.log);
        genFile(LintFiles.eslintrc);
        genFile(LintFiles.prettierrc);
        genFile(LintFiles.tsconfig);
    }
    if (argv.ts) {
        const command = `${addD} ${lintPackages} ${typescriptDevPackages} ${addOptions}`;
        console.log(command);
        await asyncExec(command).then(console.log).catch(console.log);
        genFile(LintFiles.eslintrc);
        genFile(LintFiles.prettierrc);
        genFile(LintFiles.tsconfig);
    }
    if (argv.tsc) {
        const command = `${addD} ${lintPackages} ${typescriptDevPackages} ${utilyPackages} ${addOptions}`;
        console.log(command);
        await asyncExec(command).then(console.log).catch(console.log);
        genFile(LintFiles.eslintrc);
        genFile(LintFiles.prettierrc);
        genFile(LintFiles.tsconfig);
        if (exists(path_1.join(process.cwd(), 'package.json'))) {
            const rawJson = fs_1.readFileSync('package.json', 'utf-8');
            const pkgJson = JSON.parse(rawJson);
            if (!pkgJson.scripts) {
                pkgJson.scripts = {};
            }
            pkgJson.scripts.start = start;
            pkgJson.scripts.prebuild = prebuild;
            pkgJson.main = main;
            fs_1.writeFileSync(path_1.join(process.cwd(), 'package.json'), JSON.stringify(pkgJson, null, 2));
        }
    }
}).argv;
//# sourceMappingURL=index.js.map