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