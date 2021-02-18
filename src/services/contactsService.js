const ContactsRepo = require('../repositories')

class ContactsService{
  constructor(){
    this.repo = {
      contacts: new ContactsRepo()
    }
  }
  listContacts (){
    return this.repo.contacts.listContacts()
  }
}

module.exports = ContactsService