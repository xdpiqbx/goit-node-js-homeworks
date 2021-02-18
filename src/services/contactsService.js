const ContactsRepo = require('../repositories')

class ContactsService{
  constructor(){
    this.repo = {
      contacts: new ContactsRepo()
    }
  }
  listContacts(){
    return this.repo.contacts.listContacts()
  }
  getById(contactId){
    return this.repo.contacts.getById(contactId)
  }
}

module.exports = ContactsService