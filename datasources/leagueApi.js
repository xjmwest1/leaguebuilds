var request = require('request')
var apikey = 'RGAPI-9952097a-9ea6-406f-9301-fb8643dc1e67'
var version = '7.2.1'

var services = {
	getChampionList: getChampionList,
	getItemList: getItemList
}

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

function getChampionList() {	
	return apiRequest('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/champion.json').then(function(response) {
		// convert to array
		return Object.keys(response.data).map(function(key) {
			var value = response.data[key]
			value.image.full = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/' + value.image.full;
			return value
		})
	})
}

function getItemList() {
	return apiRequest('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/item.json').then(function(response) {
		// convert to array
		return Object.keys(response.data).map(function(key) {
			var value = response.data[key]
			value.image.full = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/item/' + value.image.full;
			return value
		})
	})
	
}

module.exports = services