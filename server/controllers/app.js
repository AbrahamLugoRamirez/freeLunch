const recipies = require('../recipies/selectRecipe')
const validateInv = require('../inventory/validateInventory')
const disInventory = require('../inventory/discountInventory')

function selectRandomRecipe(kitchenRecipes, callback) {
  return recipies.selectRandomRecipe(kitchenRecipes, callback)
}

function validateInventory(selectedRecipe, inventory, callback) {
  return validateInv.validateInventory(selectedRecipe, inventory, callback)
}

function discountInventory(selectedRecipe, inventory, callback) {
  return disInventory.discountInventory(selectedRecipe, inventory, callback)
}


module.exports = {
  discountInventory,
  selectRandomRecipe,
  validateInventory,
};
