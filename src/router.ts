import { hotelConnections, hotelWithOutDB } from './controller/hotel';
import { Paging } from './middleware/paging';
import Router from 'koa-router';
const router = new Router();

router.get('/hotel', Paging, hotelConnections);
router.get('/hotelwithoutDB', Paging, hotelWithOutDB);

export = router;
