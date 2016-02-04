// Data was otained from http://philni.neocities.org/ancientssoul.html
// I started with:
//   JSON.stringify(_.map(data.heroes, function(h) { return {name: h.name, baseCost: h.baseCost, baseAttack: h.baseAttack}}), null, 2);
// Multipliers were added manually, for level 10, 25, 50, 75...
var data = {
	width: 960,
  height: 700,
  margin: 50
};

data.heroes = [
  {
    "name": "Treebeast",
    "baseCost": 50,
    "baseAttack": 4.6310688,
    "multipliers": [2, 4, 8, 20]
  },
  {
    "name": "Ivan",
    "baseCost": 250,
    "baseAttack": 21.0040868464,
    "multipliers": [2, 4, 8, 8, 8, 20]
  },
  {
    "name": "Brittany",
    "baseCost": 1000,
    "baseAttack": 73.14611834454016,
    "multipliers": [2, 4, 8, 20]
  },
  {
    "name": "Fisherman",
    "baseCost": 4000,
    "baseAttack": 244.1748781759104,
    "multipliers": [2, 4, 8]
  },
  {
    "name": "Betty",
    "baseCost": 20000,
    "baseAttack": 975.3470943637824,
    "multipliers": [1]
  },
  {
    "name": "Samurai",
    "baseCost": 100000,
    "baseAttack": 3724.2489455550303,
    "multipliers": [2, 4, 8, 20]
  },
  {
    "name": "Leon",
    "baseCost": 400000,
    "baseAttack": 10858.65465588351,
    "multipliers": [2, 4, 8]
  },
  {
    "name": "Seer",
    "baseCost": 2500000,
    "baseAttack": 47142.04297555722,
    "multipliers": [2, 4, 8, 20]
  },
  {
    "name": "Alexa",
    "baseCost": 15000000,
    "baseAttack": 186918.1833433455,
    "multipliers": [1, 2.25, 5.0625]
  },
  {
    "name": "Natalia",
    "baseCost": 100000000,
    "baseAttack": 782005.4159391565,
    "multipliers": [2, 4, 8, 20]
  },
  {
    "name": "Mercedes",
    "baseCost": 800000000,
    "baseAttack": 3721123.7962767845,
    "multipliers": [2, 4, 8, 20]
  },
  {
    "name": "Bobby",
    "baseCost": 6500000000,
    "baseAttack": 17010171.68058066,
    "multipliers": [2, 4, 8, 20]
  },
  {
    "name": "Broyle",
    "baseCost": 50000000000,
    "baseAttack": 69480773.55771662,
    "multipliers": [1, 2, 4, 10]
  },
  {
    "name": "George",
    "baseCost": 450000000000,
    "baseAttack": 460740905.61593056,
    "multipliers": [2, 4, 8, 20]
  },
  {
    "name": "Midas",
    "baseCost": 4000000000000,
    "baseAttack": 3017545771.180601,
    "multipliers": [1]
  },
  {
    "name": "Jerator",
    "baseCost": 36000000000000,
    "baseAttack": 20009949517.852802,
    "multipliers": [2, 4, 8, 20]
  },
  {
    "name": "Abaddon",
    "baseCost": 320000000000000,
    "baseAttack": 131051829375.59062,
    "multipliers": [2.25, 5.0625, 11.390625]
  },
  {
    "name": "Ma Zhu",
    "baseCost": 2700000000000000,
    "baseAttack": 814716460270.703,
    "multipliers": [2, 4, 8, 20]
  },
  {
    "name": "Amenhotep",
    "baseCost": 24000000000000000,
    "baseAttack": 5335849670466.258,
    "multipliers": [2]
  },
  {
    "name": "Beastlord",
    "baseCost": 300000000000000000,
    "baseAttack": 49143175464994.24,
    "multipliers": [2, 4, 8]
  },
  {
    "name": "Athena",
    "baseCost": 9000000000000000000,
    "baseAttack": 1086260750478232.6,
    "multipliers": [2, 4, 8, 8, 16]
  },
  {
    "name": "Aphrodite",
    "baseCost": 350000000000000000000,
    "baseAttack": 31124991370369628,
    "multipliers": [2, 4, 8, 8, 8, 16]
  },
  {
    "name": "Shinatobe",
    "baseCost": 1.4e+22,
    "baseAttack": 917315745667533700,
    "multipliers": [2, 2, 4, 8]
  },
  {
    "name": "Grant",
    "baseCost": 4.19999999999999e+24,
    "baseAttack": 202763472422351140000,
    "multipliers": [1, 2, 2, 4]
  },
  {
    "name": "Frostleaf",
    "baseCost": 2.1e+27,
    "baseAttack": 7.469806324039436e+22,
    "multipliers": [2, 4]
  },
  {
    "name": "Dread Knight",
    "baseCost": 1e+40,
    "baseAttack": 1.3104174522743468e+32,
    "multipliers": [2, 4, 8, 8, 20]
  },
  {
    "name": "Atlas",
    "baseCost": 1e+55,
    "baseAttack": 9.655155788357385e+44,
    "multipliers": [2, 4, 8, 8, 20]
  },
  {
    "name": "Terra",
    "baseCost": 1e+70,
    "baseAttack": 7.113918784861723e+57,
    "multipliers": [2, 4, 8, 8, 20]
  },
  {
    "name": "Phthalo ",
    "baseCost": 1e+85,
    "baseAttack": 5.241535360686118e+70,
    "multipliers": [2, 4, 8, 8, 20]
  },
  {
    "name": "Banana",
    "baseCost": 1e+100,
    "baseAttack": 3.8619632537535316e+83,
    "multipliers": [2, 4, 8, 8, 20]
  },
  {
    "name": "Lilin",
    "baseCost": 1e+115,
    "baseAttack": 2.8454945253656026e+96,
    "multipliers": [2, 4, 8, 8, 20]
  },
  {
    "name": "Cadmia",
    "baseCost": 1e+130,
    "baseAttack": 2.096560366289376e+109,
    "multipliers": [2, 4, 8, 8, 20]
  },
  {
    "name": "Alabaster",
    "baseCost": 1e+145,
    "baseAttack": 1.5447456778820126e+122,
    "multipliers": [2, 4, 8, 8, 20]
  },
  {
    "name": "Astraea",
    "baseCost": 1e+160,
    "baseAttack": 1.1381686154634667e+135,
    "multipliers": [2, 4, 8, 8, 20]
  } 
  /* Ignoring these bad boys since I haven't played enough to know their skills.
  {
    "name": "Chiron",
    "baseCost": 1e+175,
    "baseAttack": 8.386026358734822e+147
  },
  {
    "name": "Moloch",
    "baseCost": 1e+190,
    "baseAttack": 6.178824221115818e+160
  },
  {
    "name": "Bomber Max",
    "baseCost": 1e+205,
    "baseAttack": 4.5525576861181335e+173
  },
  {
    "name": "Gog",
    "baseCost": 1e+220,
    "baseAttack": 3.354324503131842e+186
  },
  {
    "name": "Wepwawet",
    "baseCost": 1e+235,
    "baseAttack": 2.471466293907541e+199
  } */
];
