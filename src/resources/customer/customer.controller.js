import { Customer } from './customer.model'

export const me = (req, res) => {
    res.status(200).json({ data: req.user })
}

export const updateMe = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.user._id,
            req.body,
            {
                new: true,
            }
        )
            .lean()
            .exec()

        res.status(200).json({ data: customer })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
