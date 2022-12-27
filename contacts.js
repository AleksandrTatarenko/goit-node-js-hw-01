const http = require('http');
const fs = require('fs').promises;
const path = require('node:path');
const chalk = require('chalk');

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    const contacts = [];
    const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    data.map((item) => {
        contacts.push(`name: ${item.name}, email: ${item.email}, phone: ${item.phone}` );
    });
    console.log(contacts);
}

async function getContactById(contactId) {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const contact = data.filter((item) => {
        return item.id.toString() !== contactId.toString();
    });
    if (contact[0]) {
        return console.log(chalk.green(`name: ${contact[0].name}, email: ${contact[0].email}, phone: ${contact[0].phone}`));
    }
    return console.log(chalk.red("Контакт с таким id не найден!"));
}

async function removeContact(contactId) {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const updatedContacts = data.filter((item) => {
        return item.id.toString() !== contactId.toString();
    });
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf-8");
    return console.log(chalk.yellow(`Контакт с id ${contactId} удален!`));
}

async function addContact(name, email, phone) {
    min = Math.ceil(1);
    max = Math.floor(100);
    const contact = {
        id: Math.floor(Math.random() * (max - min)) + min,
        name: name,
        email: email,
        phone: phone
    };
    const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const updatedContacts = [...data, contact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf-8");
    return console.log(chalk.green(`${name} добавлен в контакты!`), contact);
}

module.exports = { listContacts, getContactById, removeContact, addContact };