import express from "express";
import {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavorite,
} from "../../controllers/contactsControllers.js";

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/", addContact);
router.delete("/:id", removeContact);
router.put("/:id", updateContact);
router.patch("/:contactId/favorite", updateFavorite);


export default router;
