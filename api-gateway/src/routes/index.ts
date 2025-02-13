import { Router } from "express";
import userRoutes from "./user.route";
import notificationRoutes from "./notification.route";
import chatRoutes from "./chat.route";

const router = Router();

router.use("/users",userRoutes);
router.use("/notifications",notificationRoutes);
router.use("/chats",chatRoutes);
export default router;