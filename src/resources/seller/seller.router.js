import { Router } from 'express'
import { me, updateMe, getOne } from './seller.controller'

const router = new Router()

router.get('/', me)
router.put('/', updateMe)
router.get('/:id', getOne)

export default router