import { Seller } from './seller.model'

export const me = (req, res) => {
    res.status(200).json({ data: req.user })
}

export const getSearchResult = async (req, res) => {
    try {
        console.log(req.query.service, req.query.city, req.query.zip)
        if (!req.query.service) req.query.service = /.*/i
        if (!req.query.city) req.query.city = /.*/i
        if (!req.query.zip) req.query.zip = /.*/i
        const sellers = await Seller.find({
            service: req.query.service,
            'address.city': req.query.city,
            'address.zip': req.query.zip,
        })
            .lean()
            .exec()

        res.status(200).json({ data: sellers })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const getOne = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id).lean().exec()

        res.status(200).json({ data: seller })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const updateMe = async (req, res) => {
    try {
        const seller = await Seller.findByIdAndUpdate(req.user._id, req.body, {
            new: true,
        })
            .lean()
            .exec()

        res.status(200).json({ data: seller })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
