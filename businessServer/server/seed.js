var db = require('./models/index');

var Node = require('./models/node');
var Chatter = require('./models/chatter');
var Connection = require('./models/connection');
var Business = require('./models/business');
var Conversation = require('./models/conversation');


let chatters = [
    { fbAccount: 11, firstName: 'Billy BuyStuff' }
]
let nodes = [
    { question: 'What would you like to buy?' },
    { question: 'caf or decaf?' },
    { question: 'What size?' },
    { question: 'Anything else you can think of?' }
]
let connections = [
    { answer: 'coffee', fromId: 1, toId: 2, productId: 1, businessId: 1 },
    { answer: 'caf', fromId: 2, toId: 3, productId: 1, businessId: 1 },
    { answer: 'decaf', fromId: 2, toId: 3, productId: 1, businessId: 1 },
    { answer: 'large', fromId: 3, toId: 4, productId: 1, businessId: 1 },
    { answer: 'medium', fromId: 3, toId: 4, productId: 1, businessId: 1 }
]

let businesses = [
    { businessName: 'starbucks', fb_account_id: 123, headNodeId: 1 }
]


db.sync({ force: true })
    .then(function() {
        return Promise.all(
            [
                Node.bulkCreate(nodes),
                Chatter.bulkCreate(chatters),
                Business.bulkCreate(businesses),
                Connection.bulkCreate(connections)
            ])
    })
    // .then(function(proms) {
    //     proms[0].map(elem => console.log(elem))
    // })