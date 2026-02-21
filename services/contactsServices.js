import Contact from "../models/contact.js";

// Отримуємо всі контакти з пагінацією та фільтрацією
async function listContacts(ownerId, query = {}) {
    const { page = 1, limit = 20, favorite } = query;

    const offset = (Number(page) - 1) * Number(limit);

    const where = { owner: ownerId };

    if (favorite !== undefined) {
        where.favorite = String(favorite) === "true";
    }

    return Contact.findAll({
        where,
        limit: Number(limit),
        offset,
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
