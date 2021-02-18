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

const getById = async (request, response, next) => {
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

const addContact = async (request, response, next) => {
  try{
    //обязательно добавить app.use(express.json()) в app.js
    //чтоб интерпретировать значение req.body как объект JavaScript

    // Добавить валидацию!!!
    // Если в body нет каких-то обязательных полей,
    // возарщает json с ключом {"message": "missing required name field"} и статусом 400
    const newContact = await contactsService.addContact(request.body)
    response.status(201).json({
      status: 'created',
      code: 201,
      data: {
        ...newContact
      }
    })
  }catch(error){
    next(error)
  }
} 

module.exports = {
  listContacts, getById, addContact
}