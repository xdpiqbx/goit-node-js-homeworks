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

  rewriteContacts = async (contacts) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
        if (err) {
          reject(err);
        }else{
          resolve()
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

  async addContact (body) {
    const id = uuidv4()
    const newContact = {
      id,
      ...body
    }

    const listContacts = await this.fetchContacts();
    listContacts.push(newContact)
    await this.rewriteContacts(listContacts)
    return newContact
  }
}

module.exports = ContactsRepo