const h = require('hyperscript')
const { div, span, h1, p } =
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

console.log(appTitle.outerHTML);
console.log(appDescription.outerHTML);
console.log("Success");

const appTitleNode = document.getElementById('appTitle');
const appDescriptionNode = document.getElementById('appDescription')
appTitleNode.appendChild(appTitle);
appDescriptionNode.appendChild(appDescription);
