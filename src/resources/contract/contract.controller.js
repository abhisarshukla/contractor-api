import { Contract } from './contract.model'

export const getCustomerContract = async (req, res) => {
    try {
        const contracts = await Contract.find({ customer: req.user._id })
            .lean()
            .exec()

        res.status(200).json({ data: contracts })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const getSellerContract = async (req, res) => {
    try {
        const contracts = await Contract.find({ seller: req.user._id })
            .lean()
            .exec()

        res.status(200).json({ data: contracts })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const createOne = async (req, res) => {
    const customer = req.user._id
    try {
        const contract = await Contract.create({ ...req.body, customer })
        res.status(201).json({ data: contract })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const markComplete = async (req, res) => {
    try {
        const contract = await Contract.findByIdAndUpdate(
            req.params.id,
            { end_date: new Date(), completed: true },
            { new: true }
        )
            .lean()
            .exec()
        res.status(200).send({ data: contract })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
