import Contact from "../models/contact.js";

// Отримуємо всі контакти
async function listContacts() {
    return await Contact.findAll();
}

// Повертаємо контакт за id або null
async function getContactById(contactId) {
    return await Contact.findByPk(contactId);
}

// Додаємо новий контакт
async function addContact({ name, email, phone }) {
    return await Contact.create({ name, email, phone });
}

// Видаляємо контакт за id
async function removeContact(contactId) {
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
        return null;
    }

    await contact.destroy();
    return contact;
}

// Оновлюємо контакт за id
async function updateContact(contactId, data) {
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
        return null;
    }

    await contact.update(data);
    return contact;
}

// Оновлюємо статус favorite
async function updateStatusContact(contactId, body) {
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
        return null;
    }

    await contact.update(body);
    return contact;
}

export default {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
};
