const ContactsRepo = require("../repositories");

class ContactsService {
  constructor() {
    this.repo = {
      contacts: new ContactsRepo(),
    };
  }

  listContacts() {
    return this.repo.contacts.listContacts();
  }

  getById(contactId) {
    return this.repo.contacts.getById(contactId);
  }

  addContact(body) {
    return this.repo.contacts.addContact(body);
  }

  removeContact(contactId) {
    return this.repo.contacts.removeContact(contactId);
  }

  updateContact(contactId, body) {
    return this.repo.contacts.updateContact(contactId, body);
  }
}

module.exports = ContactsService;
