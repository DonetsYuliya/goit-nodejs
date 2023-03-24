const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await listContacts();
      return console.table(list);
    case "get":
      const getContact = await getContactById(id);
      return console.log(getContact);
    case "remove":
      const remove = await removeContact(id);
      return console.table(remove);
    case "add":
      const add = await addContact({ name, email, phone });
      return console.table(add);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(argv);
