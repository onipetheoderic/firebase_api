import express from 'express';
import ApiController from '../controllers/api/apiController';

const router = express.Router();

router.route('/api/send_notification')
    .post(ApiController.send_notification)



export default router;