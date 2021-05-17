import { Router } from 'express'
import { getSearchResult } from './seller.controller'

const router = new Router()
router.get('/search', getSearchResult)

export default router
