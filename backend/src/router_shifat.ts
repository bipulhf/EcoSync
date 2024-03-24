import { Router } from "express";
import { prisma } from "./db";
import { createUser } from "./auth";

const router_shifat = Router();

router_shifat.post('/user', createUser)

export default router_shifat;
