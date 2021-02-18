const { ContactsService } = require('../services')

const contactsService = new ContactsService()

const listContacts  = async (request, response, next) => {
  try{
    const listContacts = await contactsService.listContacts()
    response.status(200).json({
      status: 'success',
      code: 200,
      data: { listContacts }
    })
  }catch(error){
    next(error)
  }
}

const getById  = async (request, response, next) => {
  try{
    const { contactId } = request.params
    const contact = await contactsService.getById(contactId)
    console.log(contact);
    if(contact){
      response.status(200).json({
        status: 'success',
        code: 200,
        data: { contact }
      })
    } else {
      response.status(404).json({
        status: 'Error',
        code: 404,
        message: 'Not found'
      })
    }
  }catch(error){
    next(error)
  }
}

module.exports = {
  listContacts, getById
}