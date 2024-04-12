const kitchenRecipes = require("../models/recipes.json");
const inventory = require("../models/inventary.json");
const shopIngredients = require("../shop/shopIngredients")
const history = require("../models/history.json")
const app = require("./app");

module.exports.show = (req, res) => {
  return res.render("index", {
    kitchenRecipes: kitchenRecipes,
    inventory: inventory,
    history: history,
    foodName: "",
    error: "",
  });
};

module.exports.kitchen = async (req, res) => {
  let selectedRecipe = await selectRandomRecipe(kitchenRecipes);
  let ingredientsAvailable = await validateInventory(selectedRecipe, inventory)


  if (ingredientsAvailable) {
    console.log("All ingredients are available!");
    await prepareFood(selectedRecipe, kitchenRecipes, res)

  } else {
    let ingredientsNeeded = selectedRecipe.ingredients;
    for (let ingredient of ingredientsNeeded) {
      if (
        !inventory[ingredient.name] ||
        inventory[ingredient.name] < ingredient.count
      ) {
        inventory[ingredient.name] += shopIngredients.shopIngredients(ingredient.name)
      }
    }
    await prepareFood(selectedRecipe, kitchenRecipes, res)
  }
};

const prepareFood = async (selectedRecipe, kitchenRecipes, res) => {
  await discountInventory(selectedRecipe, inventory)

  history.push(selectedRecipe.name)
  res.render("index", {
    kitchenRecipes: kitchenRecipes,
    inventory: inventory,
    history: history,
    foodName: selectedRecipe.name,
    error: "",
  });
}

const selectRandomRecipe = (kitchenRecipes) => {
  // Returns a promise that resolves to the selected recipe
  return new Promise((resolve, reject) => {
    app.selectRandomRecipe(kitchenRecipes, function (error, response) {
      if (error) {
        reject("Error when selecting recipe: " + error);
      } else {
        console.log("Selected recipe:", response);
        resolve(response);
      }
    });
  });
}

const validateInventory = (selectedRecipe, inventory) => {
  return new Promise((resolve, reject) => {
    app.validateInventory(selectedRecipe, inventory, function (error, response) {
      if (error) {
        reject("Error validating inventory: " + error);
      } else {
        resolve(response);
      }
    });
  });
}

const discountInventory = (selectedRecipe, inventory) => {
  return new Promise((resolve, reject) => {
    app.discountInventory(selectedRecipe, inventory, function (error, response) {
      if (error) {
        reject("Error al aplicar descuento en el inventario: " + error);
      } else {
        resolve(response);
      }
    });
  });
};


