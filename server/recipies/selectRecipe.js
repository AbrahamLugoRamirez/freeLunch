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
        console.log('error here', error)
        // Si hay un error durante la ejecución del código, llama a la función de devolución de llamada con el error
        callback(error);
    }
};

module.exports = {
    selectRandomRecipe
}