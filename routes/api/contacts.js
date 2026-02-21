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
router.get("/:id", authMiddleware, getContactById);
router.post("/", authMiddleware, addContact);
router.delete("/:id", authMiddleware, removeContact);
router.put("/:id", authMiddleware, updateContact);
router.patch("/:contactId/favorite", authMiddleware, updateFavorite);

export default router;
