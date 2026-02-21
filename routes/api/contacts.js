import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavorite,
} from "../../controllers/contactsControllers.js";

const router = express.Router();

router.get("/", authMiddleware, getAllContacts);
router.get("/:id", getContactById);
router.post("/", addContact);
router.delete("/:id", removeContact);
router.put("/:id", updateContact);
router.patch("/:contactId/favorite", updateFavorite);


export default router;
