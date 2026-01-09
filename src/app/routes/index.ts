import express from "express";

import { ItemRoutes } from "../modules/item/item.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/file-manager",
    route: ItemRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
