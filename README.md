# ДЗ 02 express

## Готово:

### GET /api/contacts

- ничего не получает
- вызывает функцию `listContacts` для работы с json-файлом contacts.json
- возвращает массив всех контактов в json-формате со статусом 200

### GET /api/contacts/:contactId

- Не получает body
- Получает параметр `contactId`
- вызывает функцию getById для работы с json-файлом contacts.json
- если такой id есть, возвращает обьект контакта в json-формате со статусом 200
- если такого id нет, возвращает json с ключом `"message": "Not found"` и статусом 404

### POST /api/contacts

- Получает body в формате `{name, email, phone}`

> Добавить валидацию
>- Если в body нет каких-то обязательных полей, возарщает json с ключом `{"message": "missing required name field"}` и статусом 400

- Если с body все хорошо, добавляет уникальный идентификатор в обьект контакта
- Вызывает функцию `addContact(body)` для сохранения контакта в файле
  contacts.json
- По результату работы функции возвращает обьект с добавленным id
  `{id, name, email, phone}` и статусом 201

### DELETE /api/contacts/:contactId

- Не получает body
- Получает параметр `contactId`
- вызывает функцию `removeContact` для работы с json-файлом contacts.json
- если такой id есть, возвращает json формата `{"message": "contact deleted"}` и
  статусом 200
- если такого id нет, возвращает json с ключом `"message": "Not found"` и
  статусом 404