var uniqid = require('uniqid');
const Url = require('../modals/url.modal');


async function createUrl(req, res) {
    const { mainUrl } = req.body;
    const user = req.user
    const shortID = uniqid.time()

    if (mainUrl && shortID && user) {
        try {
            await Url.create({
                shortID, mainUrl, createdBy: user._id
            })
            res.json({ msg: "success" })
        } catch (error) {
            console.log(error)
        }
    }

}

async function getUrl(req, res) {
    const { shortID } = req.params;
    if (shortID) {
        try {
            const url = await Url.findOneAndUpdate({ shortID: shortID }, { $inc: { "clicks": 1 } }, { new: true })
            console.log(url)
            res.json(url)
        } catch (error) {
            res.json({ msg: "Error fetching the url" })
            console.log(error)
        }
    }

}

async function getAllUrl(req, res) {
    const user = req.user
    try {
        const allUrls = await Url.find({ createdBy: user._id });
        res.json(allUrls)

    } catch (error) {
        res.json({ msg: "Error fetching urls" })
    }
}
async function deleteUrl(req, res) {
    const { urlID } = req.body;
    const user = req.user
    const shortID = uniqid.time()

    if (mainUrl && shortID && user) {
        try {
            await Url.findByIdAndDelete({_id:urlID})
            res.json({ msg: "success" })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = { createUrl, getUrl, getAllUrl, deleteUrl }