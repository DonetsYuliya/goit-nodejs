const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function tryCathchWrapper(callback) {
  try {
    return callback;
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function listContacts() {
  const data = await readFile(contactsPath);
  return JSON.parse(data.toString());
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = await data.find(({ id }) => id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const result = await data.filter(({ id }) => id !== contactId);
  const newList = JSON.stringify(result, null, 2);
  await writeFile(contactsPath, newList);
  return result;
}

async function addContact({ name, email, phone }) {
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
}

module.exports = {
  tryCathchWrapper,
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
