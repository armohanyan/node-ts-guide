import express from 'express';
import { UserController } from '../controller';

const router = express.Router();

// Assuming UserController methods are correctly typed
router.get('/', UserController.getUser);
router.post('/', UserController.addUser);

export default router;
