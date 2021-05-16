import {Router} from 'express'
import {me, updateMe} from './customer.controller'

const router = new Router()

router.get('/', me)
router.put('/', updateMe)

export default router