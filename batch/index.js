#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const shell = require("shelljs");
const send = require("./modules/send");

const sayHello = () => {
  console.log(chalk.green("Batch send to Mailgun maillist"));
};

const getMaillist = () => {
  //mailgun mailing lists
  return [
    "subscribers@mg.christmind.info",
    "verify@mail.jalancintasanctuary.com"
  ];
};

//get email templates
const getTemplates = () => {
  //templates are in this directory
  const tdir = `${__dirname}/modules/templates/`;
  const templates = shell.ls(`${tdir}*.js`);

  //get template basename w/out extension
  return templates.map((t) => {
    return t.substring(tdir.length, t.length - 3);
  });
};

const askQuestions = (maillist, templates) => {

  const questions = [
    {
      type: "list",
      name: "MAILLIST",
      message: "Choose Maillist to use.",
      choices: maillist
    },
    {
      name: "TEMPLATE",
      type: "list",
      message: "Choose a Template to use.",
      choices: templates
    },
    {
      name: "SUBJECT",
      type: "input",
      message: "Enter short subject.",
      choices: templates
    }
  ];
  return inquirer.prompt(questions);
};

const success = (message) => {
  console.log(chalk.white.bgGreen.bold(`${message}`));
};

const fail = (message) => {
  console.log(chalk.white.bgRed.bold(`${message}`));
};

const run  = async () => {
  sayHello();
  try {
    const { MAILLIST, TEMPLATE, SUBJECT } = await askQuestions(getMaillist(), await getTemplates());
    const result = await send(TEMPLATE, MAILLIST, SUBJECT);
    success(result.message);
  }
  catch(err) {
    fail(err);
  }
};

run();

