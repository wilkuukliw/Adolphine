const router = require('express').Router()
const Subscriber = require('../models/Subscriber.js')

router.get('/subscribers/collection', async (req, res) => {
  const subscribers = await Subscriber.query().select()
  return res.send({ response: subscribers })
})

module.exports = router
