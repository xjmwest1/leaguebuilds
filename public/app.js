(function() {
	'use strict';
	
	
	angular.module('app', ['ngSanitize']);

	angular
		.module('app')
		.controller('Controller', Controller);

	Controller.$inject = ['$http', '$sce'];

	function Controller($http, $sce) {
		var vm = this;

		vm.champions = [];
		vm.items = [];
		
		vm.profile = {
			champion: null,
			items: [],
			stats: []
		};
		
		$http.get('/data/champions').then(function(response) {
			Array.prototype.push.apply(vm.champions, response.data);
		});
		
		$http.get('/data/items').then(function(response) {
			Array.prototype.push.apply(vm.items, response.data);
		});
		
		vm.trustHtml = function(html) {
			return $sce.trustAsHtml(html);
		}
		
		vm.updateProfileItemStats = function() {
			var stats = {};
			vm.profile.items.forEach(function(item) {
				Object.keys(item.stats).forEach(function(stat) {
					stats[stat] = (stats[stat] || 0) + item.stats[stat];
				});
			});
			
			var statsArray = Object.keys(stats).map(function(key) {
				return {
					name: key,
					value: stats[key]
				};
			});
			
			vm.profile.stats.length = 0;
			Array.prototype.push.apply(vm.profile.stats, statsArray);
		}
		
		vm.updateProfileChampStats = function() {

			var stats = Object.keys(vm.profile.champion.stats).map(function(key) {
				return key + ': ' + vm.profile.champion.stats[key];
			});

			if(typeof vm.profile.champion.statsArray === 'array') {
				vm.profile.champion.statsArray.length = 0;
			}else {
				vm.profile.champion.statsArray = [];
			}
			Array.prototype.push.apply(vm.profile.champion.statsArray, stats);		
		}
	}
	
})();