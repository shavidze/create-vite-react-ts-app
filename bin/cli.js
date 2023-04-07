#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
import chalk from 'chalk';
import { execSync } from 'child_process';
import { createSpinner } from 'nanospinner';

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange color
const neutral = chalk.greenBright;
const success = chalk.green;
const executeCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(error(`Faild to execute ${command}`), e);
    return false;
  }
  return true;
};

const repoName = process.argv[2];

const gitCheckoutCommand = `git clone --depth 1 https://github.com/shavidze/create-vite-react-ts-app ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;
const spinner = createSpinner(success(`Loading ... \n`));
console.log(success(`Cloning the repository with the name ${repoName}`));
spinner.start();
const checkout = executeCommand(gitCheckoutCommand);
if (!checkout) process.exit(-1);
spinner.success({ text: success('Project succesfully cloned') });
console.log(warning(`Installing dependencies for ${repoName}`));
const installedDeps = executeCommand(installDepsCommand);
spinner.start();
if (!installedDeps) process.exit(-1);
spinner.success({
  text: success(
    'Congrats! Now, you can run the following commands to start the application'
  ),
});
// console.log(
//   success(
//     'Congrats! Now, you can run the following commands to start the application'
//   )
// );
console.log(neutral(`cd ${repoName} && npm run dev`));
