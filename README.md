# ДЗ 02 express

## (01-node-basics)

> ### Получаем и выводим весь список контакстов в виде таблицы (console.table)
```
node index.js --action="list"
```
![list](https://i.ibb.co/rFDHXmX/list.jpg)

> ### Получаем контакт по id
```
node index.js --action="get" --id=5
```
![get](https://i.ibb.co/g7W1JgX/get.jpg)

> ### Добавялем контакт

```
node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"
```
![add](https://i.ibb.co/VWFGHLK/add.jpg)

> ### Удаляем контакт
```
node index.js --action="remove" --id=3
```
![remove](https://i.ibb.co/SrTJdXJ/rem.jpg)
