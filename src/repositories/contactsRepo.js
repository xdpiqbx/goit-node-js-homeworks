const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, '..', '..', "db", "contacts.json");

class ContactsRepo {
  constructor(){}

  fetchContacts = async () => {
    return new Promise((resolve, reject) => {
      fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  };

  listContacts () {
    // console.table(await this.fetchContacts());
    const listContacts = this.fetchContacts();
    return listContacts
  }

  async getById (contactId) {
    const listContacts = await this.fetchContacts();
    const contact = listContacts.find(({ id }) => String(id) === contactId);
    //привожу все id к строке String(id) поскольку в .json id это и строки и числа
    return contact
  }
}

module.exports = ContactsRepo