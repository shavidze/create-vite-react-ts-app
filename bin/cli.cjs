#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process');

const executeCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Faild to execute ${command}`, e);
  }
};

const repoName = process.argv[2];

const gitCheckoutCommand = `git clone --depth 1`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with the name ${repoName}`);
const checkout = executeCommand(gitCheckoutCommand);
if (!checkout) process.exit(-1);
console.log(`Installing dependencies for ${repoName}`);
const installedDeps = executeCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);
console.log(
  'Congrats! Now, you can run the following commands to start the application'
);
console.log(`cd ${repoName} && npm start`);
