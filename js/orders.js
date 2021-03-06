function newOrder(dontSpawn) {
  var filtered_orders = ALL_ORDERS.filter(isCorrectLevel);
  var order = filtered_orders[getRandomInt(0, (filtered_orders.length - 1))];

  var new_order = [order[0], order[1]];
  var price_multiplier = (100 + getRandomInt(-20, 20)) / 100;
  new_order[1] = Math.round(new_order[1] * price_multiplier);
  var qty = getRandomInt(1, PLAYER_DATA['LEVEL'] - 3);
  new_order.push(qty);

  PLAYER_DATA['CURRENT_ORDERS'].push(new_order);

  if (PLAYER_DATA['CURRENT_ORDERS'].length > 9) {
    PLAYER_DATA['CURRENT_ORDERS'].shift();
  }

  displayOrders();
  $.growl({title: "New order from town!", message: 'Check the "Town Orders" box to see what it is!'});

  if (dontSpawn != true) {
    setTimeout(newOrder, getRandomInt(20 * 1000, 600 * 1000)); // 20 and 600 seconds
  }
}

function isCorrectLevel(value) {
  return value[2] <= PLAYER_DATA['LEVEL'];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function processDrop(ing) {
  var i = 0;
  var notFound = true;

  var qty = 0;
  var price = 0;


  while (i < PLAYER_DATA['CURRENT_ORDERS'].length && notFound) {
    if (ing == PLAYER_DATA['CURRENT_ORDERS'][i][0]) {
      var ing_qty = Math.min(getIngredientQuantity(PLAYER_DATA['CURRENT_ORDERS'][i][0]), PLAYER_DATA['CURRENT_ORDERS'][i][2]);
      if (ing_qty > 0) {
        PLAYER_DATA['INGREDIENT_QUANTITIES'][PLAYER_DATA['CURRENT_ORDERS'][i][0]] -= ing_qty;
        PLAYER_DATA['GOLD'] += ing_qty * PLAYER_DATA['CURRENT_ORDERS'][i][1];

        PLAYER_DATA['CURRENT_ORDERS'][i][2] -= ing_qty;

        if (PLAYER_DATA['CURRENT_ORDERS'][i][2] <= 0) {
          PLAYER_DATA['CURRENT_ORDERS'].splice(i, 1);
        }
      }
      notFound = false;
    }
    i++;
  }

  displayOrders();
  refreshIngredientCountDisplay();
  refreshInfo();
}



// gold each will be randomly changed +/- 20%, but always rounded to nearest integer
var ALL_ORDERS = [
  ['weak_potion', 1, 7], //order, gold each, min level
  ['weak_red_potion', 2, 11],
  ['potent_potion', 5, 12],
  ['absinthe', 15, 15],
  ['rosemary_tea', 20, 19],
  ['kingly_absinthe', 70, 20],
  ['basic_poison', 70, 24],
  ['glowing_base', 100, 25],
  ['empowered_kingly_absinthe', 120, 28],
  ['cancer_cure', 150, 30],
  ['fire_starter', 200, 30],
];


function displayOrders() { //this function should be in setup.js but it isn't
  var orders_string = '<ul style="column-count:3; list-style-type: none;">';
  for (var i = 0; i < PLAYER_DATA['CURRENT_ORDERS'].length; i++) {
    var order =  PLAYER_DATA['CURRENT_ORDERS'][i];
    var ingredient_name = ALL_INGREDIENTS[order[0]].name;
    orders_string += "<li>" + order[2] + "x " + ingredient_name + "(s) at " + order[1] + " gold ea.</li>";
  }
  orders_string += "</ul>";
  $('#orders').html(orders_string);
}
