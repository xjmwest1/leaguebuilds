var request = require('request')
var config = require('../config')
var apikey = config.league.apikey;
var version = null

var services = {
	getChampionList: getChampionList,
	getItemList: getItemList,
	updateVersion: updateVersion
}

// initialization
// get current version
services.updateVersion().then(function(version) {
	console.log('Current version: ' + version)
})

// helper function for all api requests
function apiRequest(url) {
	return new Promise(function(resolve, reject) {
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(JSON.parse(response.body))
			}else {
				reject(response)
			}
		})
	})
}

function updateVersion() {
	return apiRequest('http://ddragon.leagueoflegends.com/api/versions.json').then(function(versions) {
		version = versions[0]
		return version
	}).catch(function(err) {
		return null
	})
}

function getChampionList() {	
	return apiRequest('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/champion.json').then(function(response) {
		// convert to array
		return Object.keys(response.data).map(function(key) {
			var value = response.data[key]
			value.image.full = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/' + value.image.full
			value.image.splash = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + value.id + '_0.jpg'
			return value
		})
	})
}

function getItemList() {
	return apiRequest('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/item.json').then(function(response) {
		// convert to array
		return Object.keys(response.data).map(function(key) {
			var value = response.data[key]
			value.image.full = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/item/' + value.image.full
			return value
		})
	})
	
}

module.exports = services