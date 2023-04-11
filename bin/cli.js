#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import { createSpinner } from 'nanospinner';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url); // ensuring a closs-platform valid absolut path string
const dirname = path.dirname(filename); // get directory name of filename

const repoName = process.argv[2] || 'create-vite-react-ts-app';

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange color
const neutral = chalk.yellow;
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

const updatePackageJSON = () => {
  console.log(dirname);
  const packageJSON = JSON.parse(
    fs.readFileSync(path.join(repoName, 'package.json')),
    'utf-8'
  );
  console.log(JSON.stringify(packageJSON, null, 4));
  delete packageJSON.scripts['semantic-release'];
  delete packageJSON.dependencies.chalk;
  delete packageJSON.dependencies.nanospinner;
  delete packageJSON.devDependencies['semantic-release'];
  delete packageJSON.devDependencies['cz-conventional-changelog']
  delete packageJSON.keywords;
  delete packageJSON.repository;
  delete packageJSON.bin;
  delete packageJSON.version;
  delete packageJSON.config;
  console.log('updated', JSON.stringify(packageJSON, null, 4));

  fs.writeFileSync(
    path.join(repoName, 'package.json'),
    JSON.stringify(packageJSON, null, 2)
  );
};

const gitCheckoutCommand = `git clone --depth 1 https://github.com/shavidze/create-vite-react-ts-app ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

const spinner = createSpinner(success(`Loading ... \n`));

console.log(success(`Cloning the repository with the name ${repoName}`));
spinner.start();

const checkout = executeCommand(gitCheckoutCommand);

if (!checkout) process.exit(-1);
spinner.success({ text: success('Project successfully cloned') });

updatePackageJSON();

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
fs.rmSync(path.join(repoName, '.github'), { recursive: true });
fs.rmSync(path.join(repoName, 'bin'), { recursive: true });
