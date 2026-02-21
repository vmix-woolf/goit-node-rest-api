import Contact from "../models/contact.js";

// Отримуємо всі контакти
async function listContacts(ownerId) {
    return await Contact.findAll({
        where: { owner: ownerId },
    });
}

// Повертаємо контакт за id або null
async function getContactById(contactId, ownerId) {
    return await Contact.findOne({
        where: {
            id: contactId,
            owner: ownerId,
        },
    });
}

// Додаємо новий контакт
async function addContact(data) {
    return Contact.create(data);
}

// Видаляємо контакт за id
async function removeContact(contactId, ownerId) {
    const contact = await Contact.findOne({
        where: {
            id: contactId,
            owner: ownerId,
        },
    });

    if (!contact) return null;

    await contact.destroy();
    return contact;
}

// Оновлюємо контакт за id
async function updateContact(contactId, ownerId, data) {
    const contact = await Contact.findOne({
        where: {
            id: contactId,
            owner: ownerId,
        },
    });

    if (!contact) return null;

    await contact.update(data);
    return contact;
}

// Оновлюємо статус favorite
async function updateStatusContact(contactId, ownerId, data) {
    const contact = await Contact.findOne({
        where: {
            id: contactId,
            owner: ownerId,
        },
    });

    if (!contact) return null;

    await contact.update(data);
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
