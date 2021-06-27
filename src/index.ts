import * as yargs from 'yargs';
import { exec } from 'child_process';
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
  },
).argv;
