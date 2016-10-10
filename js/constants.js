// constants
var ALL_INGREDIENTS = {
  /*
  Format:
  'namecode': {
  'name': 'Name that is displayed',
  'outline-color': 'Color in ingredients list'
}
*/
'coal': {
  'name': 'Coal',
  'outline_color': '#0A0A09',
},
'water': {
  'name': 'Water',
  'outline_color': '#86CDDB',
},
'flint': {
  'name': 'Flint',
  'outline_color': '#6C8C96',
},
'steel': {
  'name': 'Steel',
  'outline_color': '#BABABA',
},
'spark': {
  'name': 'Spark',
  'outline_color': '#EDF725',
},
'heat': {
  'name': 'Heat',
  'outline_color': '#ED9537',
},
'steam': {
  'name': 'Steam',
  'outline_color': '#A7DAEB',
},
'ice': {
  'name': 'Ice',
  'outline_color': '#A5F2F3',
},
'fresh_herb': {
  'name': 'Fresh Herb',
  'outline_color': '#B2D490',
},
'red_herb': {
  'name': 'Red Herb',
  'outline_color': '#9E1C23',
},
'weak_potion': {
  'name': 'Weak Potion',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(199, 242, 210, 0.4)',
  'is_potion': true,
},
'weak_red_potion': {
  'name': 'Weak Red Potion',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(242, 70, 70, 0.4)',
  'is_potion': true,
},
'potent_potion': {
  'name': 'Mild Potion',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(80, 105, 17, 0.6)',
  'is_potion': true,
},
'distilled_water': {
  'name': 'Distilled Water',
  'outline_color': '#86CDDB',
},
'magic_ore': {
  'name': 'Magic Ore',
  'outline_color': '#C436D1',
},
'wormwood': {
  'name': 'Wormwood',
  'outline_color': '#AFD490',
},
'absinthe': {
  'name': 'Absinthe',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(144, 214, 90, 0.3)',
  'is_potion': true,
},
'kingly_rosemary': {
  'name': "Kingly Rosemary",
  'outline_color': '#0B8C07',
},
'rosemary_tea': {
  'name': 'Rosemary Tea',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(67, 191, 110, 0.2)',
  'is_potion': true,
},
'kingly_absinthe': {
  'name': 'Kingly Absinthe',
  'outline_color': '#D633E8',
  'potion_color': 'rgba(67, 191, 110, 0.2)',
  'is_potion': true,
},




// DISPLAY ONLY, THESE INGREDIENTS SHOULD NEVER BE DISCOVERED OR USED
// NOW I UNDERSTAND HOW GAMES BECOME SUCH A CLUSTERFUCK OF UNUSED INTERNAL SHIT...
'golem': {
  'name': 'Golem',
  'outline_color': '#000000',
}

}
function ingredientName(name) {
  return ALL_INGREDIENTS[name]['name'];
}
function unlockIngredient(name) {
  if (PLAYER_DATA['UNLOCKED_INGREDIENTS'].indexOf(name) < 0) {
    PLAYER_DATA['UNLOCKED_INGREDIENTS'].push(name);
    getIngredientQuantity(name);
  }
}

var ALL_ACTIONS = {
  'gather_water': {
    'name': 'Gather water',
    'gather_text': 'Gathering water...',
    'desc': 'Send a golem to get some water from the nearby stream. +1 water, +1 XP.',
    'time': 3,
    'energycost': 15,
    'output': 'water',
    'quantity': 1,
    'xp': 1,
  },
  'gather_coal': {
    'name': 'Mine coal',
    'gather_text': 'Mining coal...',
    'desc': 'Send a golem to mine coal in the cave. +1 coal, +2 XP.',
    'time': 5,
    'energycost': 30,
    'output': 'coal',
    'quantity': 1,
    'xp': 2,
  },
  'gather_flint': {
    'name': 'Gather flint',
    'gather_text': 'Gathering flint...',
    'desc': 'Send a golem to scavenge for a piece of flint in the cave. +1 flint, +2 XP.',
    'time': 8,
    'energycost': 40,
    'output': 'flint',
    'quantity': 1,
    'xp': 2,
  },
  'gather_ice': {
    'name': 'Gather ice',
    'gather_text': 'Gathering ice...',
    'desc': 'Send a golem to gather ice from the frozen lake. +1 ice, +3 XP.',
    'time': 20,
    'energycost': 300,
    'output': 'ice',
    'quantity': 1,
    'xp': 3,
  },
  'gather_magic_ore': {
    'name': 'Mine Magic ore',
    'gather_text': 'Mining for magic ore...',
    'desc': 'Send a golem to mine magic ore in the cave. +1 magic ore, +3 XP.',
    'time': 10,
    'energycost': 500,
    'output': 'magic_ore',
    'quantity': 1,
    'xp': 3,
  },
  'gather_fresh_herb': {
    'name': 'Gather fresh green herb',
    'gather_text': 'Foraging for a fresh green herb...',
    'desc': 'Send a golem to find a fresh, green herb. +1 fresh herb, +5 XP.',
    'time': 10,
    'energycost': 700,
    'output': 'fresh_herb',
    'quantity': 1,
    'xp': 5,
  },
  'gather_red_herb': {
    'name': 'Gather fresh red herb',
    'gather_text': 'Foraging for a red herb...',
    'desc': 'Send a golem to find a fresh, red herb. +1 red herb, +5 XP.',
    'time': 10,
    'energycost': 1000,
    'output': 'red_herb',
    'quantity': 1,
    'xp': 5,
  },
  'gather_wormwood': {
    'name': 'Gather wormwood',
    'gather_text': 'Foraging for wormwood...',
    'desc': 'Send a golem to find a wormwood. +1 wormwood, +10 XP.',
    'time': 10,
    'energycost': 5000,
    'output': 'wormwood',
    'quantity': 1,
    'xp': 10,
  },
  'gather_kingly_rosemary': {
    'name': 'Gather kingly rosemary',
    'gather_text': 'Gathering kingly rosemary...',
    'desc': 'Send a golem to gather this rare herb. +1 kingly rosemary, +10 XP.',
    'time': 15,
    'energycost': 500000,
    'output': 'kingly_rosemary',
    'quantity': 1,
    'xp': 10,
  },
}
function unlockAction(name) {
  if (PLAYER_DATA['UNLOCKED_ACTIONS'].indexOf(name) < 0) {
    PLAYER_DATA['UNLOCKED_ACTIONS'].push(name);
    PLAYER_DATA['AUTOMATED_ACTIONS'][name] = 0;
  }
}


var ALL_RESEARCH = {
  'powerful_cranks': {
    'name': 'Powerful cranks',
    'desc': '+1 energy per crank',
    'base_price': 10,
    'currency': 'ENERGY',
  },
  'auto_cranker': {
    'name': 'Auto-cranker',
    'desc': 'A golem helps crank. Generate 1 energy per second.',
    'base_price': 50,
    'currency': 'ENERGY',
  },
  'fluxball': {
    'name': 'Fluxball',
    'desc': 'You pour some energy into it, it gives back. Sitting on a table, this generates 5 energy per second.',
    'base_price': 500,
    'currency': 'ENERGY',
  },
  'fast_auto_cranker': {
    'name': 'Fast auto-cranker',
    'desc': 'A golem helps crank with more elbow-grease. Generates 10 energy per second.',
    'base_price': 1000,
    'currency': 'ENERGY',
  },
  'small_turbine': {
    'name': 'Small Turbine',
    'desc': 'Sits in the yard. Generates 15 energy per second.',
    'base_price': 1,
    'currency': 'GOLD',
  },
  'solar_panel': {
    'name': 'Solar Panel',
    'desc': 'A golem builds a solar panel. Generates 600 energy per second.',
    'base_price': 50,
    'currency': 'GOLD',
  },
  'large_solar_panel': {
    'name': 'Large solar Panel',
    'desc': 'Straight from the capitol! Generates 2000 energy per second.',
    'base_price': 100,
    'currency': 'GOLD',
  },
}
function unlockResearch(name) {
  if (PLAYER_DATA['UNLOCKED_RESEARCH'].indexOf(name) < 0) {
    PLAYER_DATA['UNLOCKED_RESEARCH'].push(name);
    if (!(name in PLAYER_DATA['RESEARCHED'])) {
      PLAYER_DATA['RESEARCHED'][name] = [0, ALL_RESEARCH[name].base_price];
    }
  }
}