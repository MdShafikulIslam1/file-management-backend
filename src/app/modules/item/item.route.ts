import { Router } from "express";
import { upload } from "../../../config/multer";
import { ItemController } from "./item.controller";

const router = Router();

router.post("/create", ItemController.createItem);

router.post(
  "/upload/image",
  upload.single("image"),
  ItemController.uploadImageFile
);

router.get("/tree", ItemController.getTree);

router.get("/:id", ItemController.getFolderContents);

router.patch("/:id", ItemController.updateItem);

router.delete("/:id", ItemController.deleteItem);

export const ItemRoutes = router;
