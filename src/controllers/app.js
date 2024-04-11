// const kitchenRecipes = require("../models/recipes.json");
// const inventory = require("../models/inventary.json");

const selectRandomRecipe = (kitchenRecipes, callback) => {
  try {
    // Comprueba si kitchenRecipes es un array y tiene al menos un elemento
    if (Array.isArray(kitchenRecipes) && kitchenRecipes.length > 0) {
      // Llama a la función de devolución de llamada con un error falso y la receta aleatoria seleccionada
      callback(
        false,
        kitchenRecipes[Math.floor(Math.random() * kitchenRecipes.length)]
      );
    } else {
      // Si kitchenRecipes no es un array o está vacío, llama a la función de devolución de llamada con un error
      callback(
        new Error("La lista de recetas de cocina está vacía o no es válida")
      );
    }
  } catch (error) {
    // Si hay un error durante la ejecución del código, llama a la función de devolución de llamada con el error
    callback(error);
  }
};

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

const discountInventory = (selectedRecipe, inventory, callback) => {
  try {
    for (let ingredient of selectedRecipe.ingredients) {
      inventory[ingredient.name] -= ingredient.count;
      console.log(ingredient.name, ":", inventory[ingredient.name]);
    }
    console.log("Inventario actualizado:", inventory);
    callback(null, selectedRecipe);
  } catch (error) {
    callback(error);
  }
};


module.exports = {
  discountInventory,
  selectRandomRecipe,
  validateInventory,
};
