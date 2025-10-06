// routes/logout.js
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  // Destroy session if used, blacklist JWT if desired
  req.session?.destroy?.()
  res.json({ message: 'Logged out' })
})

module.exports = router
