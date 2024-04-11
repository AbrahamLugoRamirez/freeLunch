const kitchenRecipes = require("../models/recipes.json");
const inventory = require("../models/inventary.json");
const swal = require("sweetalert");
const app = require("./app");

module.exports.mostrar = (req, res) => {
  return res.render("index", {
    kitchenRecipes: kitchenRecipes,
    inventory: inventory,
    foodName: "",
    error: "",
  });
};

module.exports.kitchen = (req, res) => {
  let selectedRecipe;
  app.selectRandomRecipe(kitchenRecipes, function (error, response) {
    if (error) {
      return res.status(500).json({
        message: "Error al crear el Alumno",
      });
    }
    selectedRecipe = response;
  });

  let ingredientsAvailable;
  app.validateInventory(selectedRecipe, inventory, function (error, response) {
    if (error) {
      return res.status(500).json({
        message: "Error validando inventario",
      });
    }
    ingredientsAvailable = response;
  });

  if (ingredientsAvailable) {
    console.log("Receta seleccionada:", selectedRecipe.name);
    console.log("¡Todos los ingredientes están disponibles!");
    app.discountInventory(
      selectedRecipe,
      inventory,
      function (error, response) {
        if (error) {
          return res.status(500).json({
            message: "Error validando inventario",
          });
        }
      }
    );
    swal("Hello world!");
    res.render("index", {
      kitchenRecipes: kitchenRecipes,
      inventory: inventory,
      foodName: selectedRecipe.name,
      error: "",
    });
  } else {
    console.log(
      "No se pueden preparar la receta seleccionada debido a la falta de ingredientes."
    );
    res.render("index", {
      kitchenRecipes: kitchenRecipes,
      inventory: inventory,
      foodName: selectedRecipe.name,
      error:
        "No se pueden preparar la receta seleccionada debido a la falta de ingredientes",
    });
  }
};
