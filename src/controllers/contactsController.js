const { ContactsService } = require("../services");
const { HttpCode } = require("../helpers/constants");

const contactsService = new ContactsService();

const listContacts = async (request, response, next) => {
  try {
    const listContacts = await contactsService.listContacts();
    response.status(HttpCode.OK).json({
      status: HttpCode.OK,
      code: HttpCode.OK,
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
      response.status(HttpCode.OK).json({
        status: HttpCode.OK,
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      response.status(HttpCode.NOT_FOUND).json({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: "Not found",
        data: "Not found",
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
    response.status(HttpCode.CREATED).json({
      status: HttpCode.CREATED,
      code: HttpCode.CREATED,
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
      response.status(HttpCode.OK).json({
        status: HttpCode.OK,
        code: HttpCode.OK,
        message: "contact deleted",
      });
    } else {
      response.status(HttpCode.NOT_FOUND).json({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: "Not found",
        data: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (request, response, next) => {
  try {
    const { contactId } = request.params;
    const updatedContact = await contactsService.updateContact(
      contactId,
      request.body
    );

    if (updatedContact.updateStatus) {
      response.status(HttpCode.OK).json({
        status: HttpCode.OK,
        code: HttpCode.OK,
        data: updatedContact.updated,
      });
    } else {
      response.status(HttpCode.NOT_FOUND).json({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: "Not found",
        data: "Not found",
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
