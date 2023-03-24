const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const data = await readFile(contactsPath);
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const result = await data.find(({ id }) => id === contactId);
    return result || null;
  } catch (error) {
    console.error(`Got an error trying to get the contact: ${error.message}`);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const result = await data.filter(({ id }) => id !== contactId);
    const newList = JSON.stringify(result, null, 2);
    await writeFile(contactsPath, newList);
    return result;
  } catch (error) {
    console.error(
      `Got an error trying to remove the contact: ${error.message}`
    );
  }
}

async function addContact({ name, email, phone }) {
  try {
    const data = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const result = [...data, newContact];
    const newList = JSON.stringify(result, null, 2);
    await writeFile(contactsPath, newList);
    return result;
  } catch (error) {
    console.error(`Got an error trying to add the contact: ${error.message}`);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
