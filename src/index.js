const R = require("ramda");
const h = require('hyperscript');
const { h1, p, table, thead, tbody, tr, th, td } =
  require('hyperscript-helpers')(h);

const appTitle = h1("Basic Minimal Webpack Config for New APP");
const appDescription = p("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
  + " eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad"
  + " minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex"
  + " ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
  + " velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat"
  + " cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id"
  + " est laborum."
);

const MEALS = [
  {description: "breakfast", calories: 460}
  , {description: "snack", calories: 180}
  , {description: "lunch", calories: 600}
];

function createCell(tag, className, value) {
  // return hyperscript tag
  return tag({className}, value);
}

function createMealRow(className, meal) {
  // use array to pass multiple child fn nodes
  return tr({className}, [
    createCell(td, "pa2", meal.description)
    , createCell(td, "pa2 tr", meal.calories)
  ]);
}

const headerRow = tr([
    createCell(td, "pa2", "MEALS")
    , createCell(td, "pa2 tr", "CALORIES")
  ]);

function createTotalRow(className, meals) {
  const total = R.compose(
    getTotalCalories
    , getCalories
  );
  return tr({className}, [
    createCell(td, "pa2 tr", "TOTAL:")
    , createCell(td, "pa2 tr", total(meals))
  ]);
}

function createTHead(className) {
  return th({className}, headerRow);
}

function createTbody(className, meals) {
  const rows = R.map(R.partial(createMealRow, ["pa2 stripe-dark"])
    , meals);
  return tbody({className}, [
    rows
    , createTotalRow("bt b", meals)]);
}

function createTable(className) {
  // use array to pass multiple child fn nodes
  return table({className}, [
    createTHead("")
    , createTbody("", MEALS)
  ]);
}

// helper, point-free: meals
const getCalories = R.map(item => {
  return item.calories;
});

// helper
function sum(x, y) {
  return x + y;
}

// helper, point-free: getCalories
const getTotalCalories = R.reduce(sum, 0);

// const node = document.getElementById('mealTable');
// const view = createTable("mw5 w-100 center collapse", MEALS);
// node.appendChild(view);
