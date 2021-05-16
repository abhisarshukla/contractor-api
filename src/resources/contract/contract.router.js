import {Router} from 'express'
import {getCustomerContract, getSellerContract, createOne, markComplete} from './contract.controller'

const contractRouterSeller = new Router()
const contractRouterCustomer = new Router()

contractRouterSeller.get('/', getSellerContract)

contractRouterCustomer.get('/', getCustomerContract)
contractRouterCustomer.put('/completed/:id', markComplete)
contractRouterCustomer.post('/', createOne)

export {contractRouterCustomer, contractRouterSeller}