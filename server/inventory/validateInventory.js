const validateInventory = (selectedRecipe, inventory, callback) => {
  try {
    let ingredientsNeeded = selectedRecipe.ingredients;
    let ingredientsAvailable = true;
    for (let ingredient of ingredientsNeeded) {
      if (
        !inventory[ingredient.name] ||
        inventory[ingredient.name] < ingredient.count
      ) {
        console.log("Lo siento, no hay suficiente", ingredient);
        ingredientsAvailable = false;
        break;
      }
    }
    callback(null, ingredientsAvailable);
  } catch (error) {
    callback(error);
  }
};


module.exports = {
  validateInventory
}