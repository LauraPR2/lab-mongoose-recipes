const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"] },
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
})

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

Recipe.create({ title: "Pasta Felix", level: "Easy Peasy", ingredients: ["Tomato", "Pasta", "Tofu", "Onion", "Olive Oil", "Garlic", "Basil", "Pepper", "Salt"], cuisine: "italian", dishType: "Dish", duration: 30, creator: "Laura" })
  .then(recipe => { console.log('The title is: ', recipe.title) })
  .catch(err => { console.log('An error happened:', err) });



Recipe.insertMany(data)
  .then(data => {
    for (i = 0; i < data.length; i++) {
      console.log('The title is: ', data[i].title)
    }
  })
  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then(x => { console.log("the duration in the following x changed!") })
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(recipe => { console.log("Recipe has been deleted") })
  .then(() => mongoose.disconnect())
  .catch(err => { console.log("An error happened", err) });


