import contactsService from "../services/contactsServices.js";
import {
    createContactSchema,
    updateContactSchema,
} from "../schemas/contactsSchemas.js";

// Отримуємо всі контакти
export const getAllContacts = async (req, res) => {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
};

// Отримуємо контакт за id
export const getContactById = async (req, res) => {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);

    if (!contact) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
};

// Додаємо новий контакт
export const addContact = async (req, res) => {
    const { error } = createContactSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
};

// Видаляємо контакт за id
export const removeContact = async (req, res) => {
    const { id } = req.params;
    const removedContact = await contactsService.removeContact(id);

    if (!removedContact) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(removedContact);
};

// Оновлюємо контакт за id
export const updateContact = async (req, res) => {
    const { id } = req.params;

    if (Object.keys(req.body).length === 0) {
        return res
            .status(400)
            .json({ message: "Body must have at least one field" });
    }

    const { error } = updateContactSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const updatedContact = await contactsService.updateContact(id, req.body);

    if (!updatedContact) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
};

export default {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
};

