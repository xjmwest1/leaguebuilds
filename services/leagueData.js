var leagueApi = require('../datasources/leagueApi')

var services = {
	getChampionList: getChampionList,
	getItemList: getItemList,
	updateVersion: updateVersion
}


function getChampionList() {	
	return leagueApi.getChampionList().then(function(list) {
		var champStats = getChampStats()
		
		return list.map(function(item) {
			// convert champ stats into english
			var stats = Object.keys(item.stats)
			stats.forEach(function(stat) {
				if(champStats[stat]) {
					item.stats[champStats[stat]] = item.stats[stat]
					delete item.stats[stat]
				}
			})
			return item
		})
	})
}

function getItemList() {
	return leagueApi.getItemList().then(function(list) {
		var itemStats = getItemStats()
		
		return list.filter(function(item) {
			// filter: 	keep only newsummmerrift map items
			// 			remove items with no name
			// 			remove quick charge items
			return item.maps['11'] && item.name.length > 0 && item.name.indexOf('(Quick Charge)') < 0
		}).map(function(item) {
			// convert item stats into english
			var stats = Object.keys(item.stats)
			stats.forEach(function(stat) {
				if(itemStats[stat]) {
					item.stats[itemStats[stat]] = item.stats[stat]
					delete item.stats[stat]
				}
			})
			return item
		})
	})
}

function updateVersion() {
	return leagueApi.updateVersion()
}

function getChampStats() {
	return {
		hp: 0,
		hpperlevel: 0,
		mp: 0,
		mpperlevel: 0,
		movespeed: 0,
		armor: 0,
		armorperlevel: 0,
		spellblock: 0,
		spellblockperlevel: 0,
		attackrange: 0,
		hpregen: 0,
		hpregenperlevel: 0,
		mpregen: 0,
		mpregenperlevel: 0,
		crit: 0,
		critperlevel: 0,
		attackdamage: 0,
		attackdamageperlevel: 0,
		attackspeedoffset: 0,
		attackspeedperlevel: 0
	}
}

function getItemStats() {
	return {
		FlatHPPoolMod: 'Health',
		rFlatHPModPerLevel: 'Health per level',
		FlatMPPoolMod: 'Mana',
		rFlatMPModPerLevel: 'Mana per level',
		PercentHPPoolMod: 'Bonus Health',
		PercentMPPoolMod: 'Bonus Mana',
		FlatHPRegenMod: 'Base Health Regen',
		rFlatHPRegenModPerLevel: 0,
		PercentHPRegenMod: 0,
		FlatMPRegenMod: 0,
		rFlatMPRegenModPerLevel: 0,
		PercentMPRegenMod: 0,
		FlatArmorMod: 0,
		rFlatArmorModPerLevel: 0,
		PercentArmorMod: 0,
		rFlatArmorPenetrationMod: 0,
		rFlatArmorPenetrationModPerLevel: 0,
		rPercentArmorPenetrationMod: 0,
		rPercentArmorPenetrationModPerLevel: 0,
		FlatPhysicalDamageMod: 0,
		rFlatPhysicalDamageModPerLevel: 0,
		PercentPhysicalDamageMod: 0,
		FlatMagicDamageMod: 0,
		rFlatMagicDamageModPerLevel: 0,
		PercentMagicDamageMod: 0,
		FlatMovementSpeedMod: 0,
		rFlatMovementSpeedModPerLevel: 0,
		PercentMovementSpeedMod: 0,
		rPercentMovementSpeedModPerLevel: 0,
		FlatAttackSpeedMod: 0,
		PercentAttackSpeedMod: 0,
		rPercentAttackSpeedModPerLevel: 0,
		rFlatDodgeMod: 0,
		rFlatDodgeModPerLevel: 0,
		PercentDodgeMod: 0,
		FlatCritChanceMod: 0,
		rFlatCritChanceModPerLevel: 0,
		PercentCritChanceMod: 0,
		FlatCritDamageMod: 0,
		rFlatCritDamageModPerLevel: 0,
		PercentCritDamageMod: 0,
		FlatBlockMod: 0,
		PercentBlockMod: 0,
		FlatSpellBlockMod: 0,
		rFlatSpellBlockModPerLevel: 0,
		PercentSpellBlockMod: 0,
		FlatEXPBonus: 0,
		PercentEXPBonus: 0,
		rPercentCooldownMod: 0,
		rPercentCooldownModPerLevel: 0,
		rFlatTimeDeadMod: 0,
		rFlatTimeDeadModPerLevel: 0,
		rPercentTimeDeadMod: 0,
		rPercentTimeDeadModPerLevel: 0,
		rFlatGoldPer10Mod: 0,
		rFlatMagicPenetrationMod: 0,
		rFlatMagicPenetrationModPerLevel: 0,
		rPercentMagicPenetrationMod: 0,
		rPercentMagicPenetrationModPerLevel: 0,
		FlatEnergyRegenMod: 0,
		rFlatEnergyRegenModPerLevel: 0,
		FlatEnergyPoolMod: 0,
		rFlatEnergyModPerLevel: 0,
		PercentLifeStealMod: 0,
		PercentSpellVampMod: 0
	}
}

module.exports = services