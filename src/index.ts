import * as yargs from 'yargs';
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
const command = `yarn add -D eslint eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin -E`;
const argv = yargs.command(
  '$0',
  'the default command',
  () => {
    return;
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

    const lintFiles = ['.eslintrc.js', '.prettierrc'];
    if (!exists(join(process.cwd(), lintFiles[0]))) {
      copyFileSync(
        require.resolve(`iusllint/lintfiles/${lintFiles[0]}`),
        join(process.cwd(), lintFiles[0]),
      );
    }
    if (!exists(join(process.cwd(), lintFiles[1]))) {
      copyFileSync(
        require.resolve(`iusllint/lintfiles/${lintFiles[1]}`),
        join(process.cwd(), lintFiles[1]),
      );
    }
  },
).argv;
