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
    discountInventory
}