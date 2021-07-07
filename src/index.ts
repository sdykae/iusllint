import yargs from 'yargs';
import { exec } from 'child_process';
import { copyFileSync, accessSync, PathLike } from 'fs';
import { join } from 'path';
const exists = (path: PathLike): boolean => {
  try {
    accessSync(path);
    console.log(`path: ${path} exists, ignoring default lint file copy`);
    return true;
  } catch {
    return false;
  }
};
enum LintFiles {
  eslintrc = '.eslintrc',
  prettierrc = '.prettierrc',
  tsconfig = 'tsconfig.json',
}
const command = `yarn add -D eslint eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin -E`;
const tCommand = `yarn add -D typescript ttypescript ts-node nodemon ts-transformer-keys @types/node -E`;

const genFile = (file: LintFiles): void => {
  if (!exists(join(process.cwd(), file))) {
    copyFileSync(
      require.resolve(`iusllint/lintfiles/${file}`),
      join(process.cwd(), file),
    );
  }
};

const argv = yargs.command(
  '$0',
  'the default command',
  (yargs) => {
    return yargs
      .option('t', {
        alias: 'typescript',
        describe: 'generate aditional standard tsconfig.json',
        type: 'boolean',
      })
      .option('ts', {
        alias: 'tsdev',
        describe:
          'generate aditional standard tsconfig.json and installs basic typescript dev env',
        type: 'boolean',
      });
    // .option();
  },
  (argv) => {
    exec(command, (error, stdout, stderr) => {
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
      exec(tCommand, (error, stdout, stderr) => {
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
  },
).argv;
