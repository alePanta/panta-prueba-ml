import express from 'express';
import bodyParser from 'body-parser';
import CallbackController from '../controllers/callbackController';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// endpoints
router.get('/api/items', CallbackController.getSearch);
router.get('/api/items/:id', CallbackController.getDetail);

export default router;
