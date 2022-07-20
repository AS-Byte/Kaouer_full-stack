const express = require('express')
const app = express()
const centreRoute = express.Router()

const Centre = require('../models/Centre')
centreRoute.route('/create').post((req, res, next) => {
    Centre.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
  
        res.json(data)
  
      }
    })
  
  
  
  
  })
  
  // Get All Centres
  centreRoute.route('/').get((req, res) => {
    Centre.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  // Get single Centre
  centreRoute.route('/read/:id').get((req, res) => {
    Centre.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  // Update Centre
  centreRoute.route('/update/:id').put((req, res, next) => {
    Centre.findByIdAndUpdate(
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
  
  // Delete Centre
  centreRoute.route('/delete/:id').delete((req, res, next) => {
    Centre.findOneAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.status(200).json({
          msg: data,
        })
      }
    })
  })
  
  
  module.exports = centreRoute