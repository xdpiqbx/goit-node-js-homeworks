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
    next(e)
  }
}

module.exports = {
  listContacts 
}