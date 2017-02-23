var express = require('express')
var router = express.Router()
var leagueData = require('../services/leagueData')

router.get('/champions', function(req, res, next) {
	leagueData.getChampionList().then(function(list) {
		res.status(200).json(list)
	}).catch(function(error) {
		res.status(200).json(error)
	})
})

router.get('/items', function(req, res, next) {
	leagueData.getItemList().then(function(list) {
		res.status(200).json(list)
	}).catch(function(error) {
		res.status(200).json(error)
	})
})

router.get('/updateversion', function(req, res, next) {
	leagueData.updateVersion().then(function(version) {
		res.status(200).json(version)
	}).catch(function(error) {
		res.status(200).json(error)
	})
})

module.exports = router