import prisma from "../../../shared/prisma";

const createItem = async (data: {
  name: string;
  type: "FOLDER" | "FILE";
  fileType?: "TEXT" | "IMAGE";
  parentId?: string;
}) => {
  console.log("payload", data);
  return prisma.item.create({ data });
};

const getFolderContents = async (id: string) => {
  return await prisma.item.findMany({
    where: { parentId: id || null },
  });
};

export const getTree = async () => {
  const items = await prisma.item.findMany({});

  const map = new Map();
  items.forEach((i) => map.set(i.id, { ...i, children: [] }));

  const root: any = [];

  items.forEach((i) => {
    if (i.parentId) {
      map.get(i.parentId)?.children.push(map.get(i.id));
    } else {
      root.push(map.get(i.id));
    }
  });

  return root;
};

export const updateItem = async (id: string, data: any) => {
  return prisma.item.update({
    where: { id },
    data,
  });
};

export const deleteItemRecursive = async (id: string) => {
  const children = await prisma.item.findMany({ where: { parentId: id } });

  for (const child of children) {
    await deleteItemRecursive(child.id);
  }

  await prisma.item.delete({ where: { id } });
};

export const ItemService = {
  createItem,
  getFolderContents,
  getTree,
  updateItem,
  deleteItemRecursive,
};
