var router = require('express').Router();
module.exports = router;

var db = require('../models');
var Node = db.model('node');
var Connection = db.model('connection');

router.use('/', function(req,res,next) {
  console.log('getting to /api/connection routes');
  next();
})

// router.post('/all', (req, res, next) => {
//   if(req.body.connections){
//     Promise.all(req.body.connections.map(function(conn){

//       return Node.create({
//          answer: conn.answer,
//          fromId: conn.nodeId,
//          productId: conn.productId,
//          businessId: conn.businessId
//       })
//     }))
//     .then(res => {
//       console.log(res);
//     })
//     .catch(next);
//   }
//   else{
//     res.sendStatus(500);
//   }
// })

router.get('/', function(req, res, next) {
  if(req.query.businessId){
    Connection.findAll({
      where: {
        businessId: req.query.businessId
      }
    })
    .then(conn => {
      res.send(conn);
    })
  }
  else{
    Connection.findAll()
    .then(function(connections) {
      res.json(connections);
    });
  }

});

router.get('/:id', function(req, res, next) {
  Connection.findOne( {
    where: { id: req.params.id },
    include: [
      {model: Node, as: "from"},
      {model: Node, as: "to"}
    ]
  })
  .then(function(connection) {
    res.json(connection)
  })
});

router.post('/', function(req, res, next) {
  // ASSUME WE HAVE A FROM NODE ID PASSED IN req.body
  Connection.create({
      answer: req.body.answer,
      fromId: req.body.fromId,
      toId: req.body.toId,
      productId: req.body.productId,
      businessId: req.body.businessId,
      price: req.body.price,
      description: req.body.description
    }
  )
  .then(function(_connection) {
    res.json(_connection);
  })
});
router.put('/leaf', (req, res, next) => {
  Promise.all(
    req.body.conns.forEach(conn => {
      Connection.findById(conn.id)
        .then(connToUpdate => {
          connToUpdate.update({toId: req.body.toId})
        })
    }))
  res.sendStatus(200);

})

router.put('/:connectionId', function(req, res, next){
  // update toId on connection
  Connection.findById(req.params.connectionId)
  .then(connection => {
    if(connection){
      connection.update(req.body)
        .then(updatedConnection => {
          res.json(updatedConnection);
        })
    }
    else{
      res.sendStatus(404);
    }
  })
  .catch(next);


})

