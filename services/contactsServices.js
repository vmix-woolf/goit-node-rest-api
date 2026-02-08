import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

// Отримуємо абсолютний шлях до contacts.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "../contacts.json");

// Зчитуємо всі контакти з файлу
async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

// Повертаємо контакт за id або null
async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id === contactId) || null;
}

// Додаємо новий контакт
async function addContact({ name, email, phone }) {
    const contacts = await listContacts();

    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
}

// Видаляємо контакт за id
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);

    if (index === -1) {
        return null;
    }

    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removedContact;
}

// Оновлюємо контакт за id
async function updateContact(contactId, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);

    if (index === -1) {
        return null;
    }

    contacts[index] = { ...contacts[index], ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[index];
}

export default {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
};
