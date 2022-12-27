const argv = require("yargs").argv;
const chalk = require('chalk');
const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

console.log(chalk.yellow("Wellcome to contacts book!"))

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          listContacts();
      break;

    case "get":
          getContactById(id);
      break;

    case "add":
          addContact(name, email, phone);
      break;

    case "remove":
          removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);