const express = require('express')
const app = express()
const terrainRoute = express.Router()

// Terrain model
let Terrain = require('../models/Terrain')

// Add Terrain
terrainRoute.route('/create').post((req, res, next) => {
  Terrain.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Terrains
terrainRoute.route('/').get((req, res) => {
  Terrain.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single terrain
terrainRoute.route('/read/:id').get((req, res) => {
  Terrain.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update terrain
terrainRoute.route('/update/:id').put((req, res, next) => {
  Terrain.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    },
  )
})

// Delete terrain
terrainRoute.route('/delete/:id').delete((req, res, next) => {
  Terrain.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = terrainRoute
