const shopIngredients = (ingredientName) => {
    return Math.floor(Math.random() * (10 - 4 + 1)) + 4;;
}

module.exports = {
    shopIngredients
}