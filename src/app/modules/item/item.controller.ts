import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import prisma from "../../../shared/prisma";
import sendResponse from "../../../shared/sendResponse";
import { ItemService } from "./item.service";

const createItem = catchAsync(async (req, res) => {
  const item = await ItemService.createItem(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Item created successfully",
    data: item,
  });
});

const uploadImageFile = async (req: Request, res: Response) => {
  const { name, parentId } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }

  const imagePath = `/uploads/${req.file.filename}`;

  const item = await prisma.item.create({
    data: {
      name,
      type: "FILE",
      fileType: "IMAGE",
      parentId: parentId || null,
      imageUrl: imagePath,
    },
  });

  res.json(item);
};

const getFolderContents = catchAsync(async (req, res) => {
  console.log("params", req.params.id);
  const data = await ItemService.getFolderContents(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Folder contents retrieved successfully",
    data,
  });
});

export const getTree = async (req: Request, res: Response) => {
  const tree = await ItemService.getTree();
  res.json(tree);
};

export const updateItem = async (req: Request, res: Response) => {
  const updated = await ItemService.updateItem(req.params.id, req.body);
  res.json(updated);
};

export const deleteItem = async (req: Request, res: Response) => {
  await ItemService.deleteItemRecursive(req.params.id);
  res.json({ message: "Deleted successfully" });
};

export const ItemController = {
  createItem,
  uploadImageFile,
  getFolderContents,
  getTree,
  updateItem,
  deleteItem,
};
