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
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
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

  async removeContact (contactId) {
    const listContacts = await this.fetchContacts();
    const isIdExist = listContacts.find(({id}) => String(id) === contactId) ? true : false
    if(isIdExist){
      const filteredContacts = listContacts.filter(({id}) => String(id) !== contactId)
      await this.rewriteContacts(filteredContacts)
    }
    return isIdExist
    // если равны то ничего не удалил
  }

  async updateContact (contactId, body) {
    const listContacts = await this.fetchContacts();
    const searchResultFromList = listContacts.find(({id}) => String(id) === contactId)
    
    if(!searchResultFromList){
      return{updateStatus: false}
    }else{
      const updatedContact = {...searchResultFromList, ...body}
      const filteredContacts = listContacts.filter(({id}) => String(id) !== contactId)
      filteredContacts.push(updatedContact)
      await this.rewriteContacts(filteredContacts)
      return{ updated: updatedContact, updateStatus: true }
    }
  }
}

module.exports = ContactsRepo