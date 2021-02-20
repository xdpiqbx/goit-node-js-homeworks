const { ContactsService } = require("../services");

const contactsService = new ContactsService();

const listContacts = async (request, response, next) => {
  try {
    const listContacts = await contactsService.listContacts();
    response.status(200).json({
      status: "success",
      code: 200,
      data: { listContacts },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (request, response, next) => {
  try {
    const { contactId } = request.params;
    const contact = await contactsService.getById(contactId);
    if (contact) {
      response.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      response.status(404).json({
        status: "Error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (request, response, next) => {
  try {
    //обязательно добавить app.use(express.json()) в app.js
    //чтоб интерпретировать значение req.body как объект JavaScript

    // Добавить валидацию!!!
    // Если в body нет каких-то обязательных полей,
    // возарщает json с ключом {"message": "missing required name field"} и статусом 400
    const newContact = await contactsService.addContact(request.body);
    response.status(201).json({
      status: "created",
      code: 201,
      data: {
        ...newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (request, response, next) => {
  try {
    const { contactId } = request.params;
    const isDeleted = await contactsService.removeContact(contactId);
    if (isDeleted) {
      response.status(200).json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else {
      response.status(404).json({
        status: "Error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (request, response, next) => {
  try {
    const { contactId } = request.params;
    const updatedContact = await contactsService.updateContact(contactId, request.body);

    if (updatedContact.updateStatus) {
      response.status(200).json({
        status: "success",
        code: 200,
        data: updatedContact.updated,
      });
    } else {
      response.status(404).json({
        status: "Error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
