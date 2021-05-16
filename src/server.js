import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import { connect } from './utils/db'
import {
    signupCustomer,
    signinCustomer,
    signupSeller,
    signinSeller,
    protectCustomer,
    protectSeller,
} from './utils/auth'
import sellerRouter from './resources/seller/seller.router'
import customerRouter from './resources/customer/customer.router'
import {contractRouterCustomer, contractRouterSeller} from './resources/contract/contract.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup/c', signupCustomer)
app.post('/signin/c', signinCustomer)
app.post('/signup/s', signupSeller)
app.post('/signin/s', signinSeller)

app.use('/api/c', protectCustomer)
app.use('/api/s', protectSeller)

app.use('/api/c/user', customerRouter)
app.use('/api/s/user', sellerRouter)
app.use('/api/c/contract', contractRouterCustomer)
app.use('/api/s/contract', contractRouterSeller)


app.get('/', (req, res) => {
    res.send({
        message: 'Hello Insomnia',
        params: [req.query.a, req.query.b, req.query.c],
    })
})

app.post('/', (req, res) => {
    console.log('Received', req.body)
    res.send({ message: 'OK' })
})

export const start = async () => {
    try {
      await connect()
      app.listen(config.port, () => {
        console.log(`CONTRACTOR API on http://localhost:${config.port}/api`)
      })
    } catch (e) {
      console.error(e)
    }
  }
