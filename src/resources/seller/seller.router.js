import { Router } from 'express'
import { me, updateMe, getOne } from './seller.controller'

const router = new Router()

router.get('/', me)
router.put('/', updateMe)

export default router