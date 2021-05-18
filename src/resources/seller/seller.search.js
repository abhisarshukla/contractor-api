import { Router } from 'express'
import { getSearchResult, getOne } from './seller.controller'

const router = new Router()
router.get('/search', getSearchResult)
router.get('/s/:id', getOne)

export default router
