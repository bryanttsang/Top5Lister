const Top5List = require('../models/top5list-model');
const User = require('../models/user-model');
const Community = require('../models/community-model');

createTop5List = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }

    const top5List = new Top5List(body);
    console.log("creating top5List: " + JSON.stringify(top5List));
    if (!top5List) {
        return res.status(400).json({ success: false, error: err })
    }

    top5List
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                top5List: top5List,
                message: 'Top 5 List Created!'
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json({
                error,
                message: 'Top 5 List Not Created!'
            })
        })
}

updateTop5List = async (req, res) => {
    const body = req.body
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        if (body.publish > 3276633600000) {
            // update community list
            // add to count
            Community.findOne({ name: body.name.toLowerCase() }, (err, com) => {
                if (com === null) {
                    // create new community list
                    console.log("CREATED NEW COMMUNITY LIST");
                    const items = body.items;
                    const field = {
                        name: body.name.toLowerCase(),
                        items: [
                            { item: items[0], point: 5 },
                            { item: items[1], point: 4 },
                            { item: items[2], point: 3 },
                            { item: items[3], point: 2 },
                            { item: items[4], point: 1 }
                        ],
                        like: [],
                        dislike: [],
                        comment: [],
                        view: 0,
                        publish: Date.now()
                    };
                    const newCom = new Community(field);
                    if (newCom) {
                        newCom.save().catch(error => { console.log(error); });
                    }
                } else {
                    // community list exists
                    // update items and publish
                    console.log("UPDATED EXISTING COMMUNITY LIST");
                    for (let i = 0; i < 5; i++) {
                        let index = com.items.findIndex(pair => pair.item === body.items[i]);
                        if (index === -1) {
                            let newItem = { item: body.items[i], point: 5-i };
                            com.items.push(newItem);
                        } else {
                            let newItem = { item: body.items[i], point: com.items[index].point + (5-i)};
                            com.items.splice(index, 1, newItem);
                        }
                    }
                    com.publish = Date.now();
                    com.save().catch(error => { console.log(error); });
                }
            });
        }

        top5List.name = body.name
        top5List.items = body.items
        top5List.like = body.like
        top5List.dislike = body.dislike
        top5List.comment = body.comment
        top5List.view = body.view
        top5List.publish = body.publish > 3276633600000 ? body.publish/2 : body.publish
        top5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

deleteTop5List = async (req, res) => {
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        if (top5List.publish >= 1638316800000) {
            // update community list
            // remove from count
            Community.findOne({ name: top5List.name.toLowerCase() }, (err, com) => {
                if (com) {
                    // edit community list
                    let items = com.items;
                    for (let i = 0; i < 5; i++) {
                        let index = items.findIndex(pair => pair.item === top5List.items[i]);
                        if (items[index].point - (5-i) == 0) {
                            items.splice(index, 1);
                        } else {
                            let newItem = { item: items[index].item, point: items[index].point - (5-i) };
                            items.splice(index, 1, newItem);
                        }
                    }
                    if (items.length == 0) {
                        console.log("DELETED EXISTING COMMUNITY LIST");
                        Community.findOneAndDelete({ _id: com._id }).catch(err => console.log(err));
                    } else {
                        console.log("UPDATED EXISTING COMMUNITY LIST");
                        com.items = items;
                        com.publish = Date.now();
                        console.log(com);
                        com.save().catch(error => { console.log(error); });
                    }
                }
            });
        }
        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
    })
}

getTop5ListById = async (req, res) => {
    let user = await User.findById({ _id: req.userId }, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
    });
    let email = user.email;
    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (email === list.ownerEmail) {
            return res.status(200).json({ success: true, top5List: list });
        } else {
            return res.status(401).json({ success: false, error: err });
        }
    }).catch(err => console.log(err));
}
getTop5Lists = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}
getTop5ListPairs = async (req, res) => {
    await Top5List.find({ }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            console.log("!top5Lists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                let pair = {
                    _id: list._id,
                    name: list.name,
                    email: list.ownerEmail,
                    username: list.username,
                    publish: list.publish
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

 getCommunity = async (req, res) => {
    await Community.find({}, (err, com) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!com) {
            return res
                .status(404)
                .json({ success: false, error: `Community lists not found` })
        }
        return res.status(200).json({ success: true, data: com })
    }).catch(err => console.log(err))
}

updateCommunity = async (req, res) => {
    const body = req.body
    console.log("updateCommunity: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Community.findOne({ _id: req.params.id }, (err, com) => {
        console.log("Community List found: " + JSON.stringify(com));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Community List not found!',
            })
        }

        com.items = body.items
        com.like = body.like
        com.dislike = body.dislike
        com.comment = body.comment
        com.view = body.view
        com.publish = body.publish
        com
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: com._id,
                    message: 'Community List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Community List not updated!',
                })
            })
    })
}

module.exports = {
    createTop5List,
    updateTop5List,
    deleteTop5List,
    getTop5Lists,
    getTop5ListPairs,
    getTop5ListById,

    getCommunity,
    updateCommunity
}