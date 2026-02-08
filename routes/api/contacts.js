import express from "express";
import {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
} from "../../controllers/contactsControllers.js";

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/", addContact);
router.delete("/:id", removeContact);
router.put("/:id", updateContact);

export default router;
