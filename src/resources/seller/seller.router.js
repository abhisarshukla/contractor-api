import { Router } from 'express'
import { me, updateMe, getSearchResult, getOne } from './seller.controller'

const router = new Router()

router.get('/', me)
router.put('/', updateMe)
router.get('/search', getSearchResult)
router.get('/:id', getOne)

export default router