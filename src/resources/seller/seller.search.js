import { Router } from 'express'
import { getSearchResult, getOne, getAll } from './seller.controller'

const router = new Router()
router.get('/search', getSearchResult)
router.get('/seller/:id', getOne)
router.get('/all', getAll)

export default router
