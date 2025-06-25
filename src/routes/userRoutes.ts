import { Router, Request, Response } from "express";
import { UserService } from "../services/userservices";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

userRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
        const user  = await UserService.getUserById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

userRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, name} = req.body;
        if (!email || !name) {
            res.status(400).json({ error: "Name and email are required" });
            return;
        }
        const newUser = await UserService.createUser({ name, email });
        res.status(201).json(newUser);
    } catch (error: any) {
         if (error.code === '23505') { // Unique violation
         res.status(400).json({ error: 'Email already exists' });
    }
        res.status(500).json({ error: "Internal Server Error" });
    }
})

userRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await UserService.deleteUser(id);
    
    if (!deleted) {
       res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
export default userRouter;