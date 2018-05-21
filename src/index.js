// const h = require('hyperscript')
// const { div, span, h1, p } = require('hyperscript-helpers')(h);
import h from "hyperscript";
import hh from "hyperscript-helpers";

const {div, button} = hh(h);

// functions:
// view
// update model
const initModel = 0;

// dipatch fn is passed as first param to view fn to make it avail in scope to
// onclick event handler
function createView(_dispatch, _model) {
  // pass array of child nodes to be returned by div node
  return div([
    div({className: "mv2"}, `Count: ${_model}`)
    , button({ className: "pv1 ph2 mr2", onclick: _dispatch("inc") }, "+")
    , button({ className: "pv1 ph2", onclick: _dispatch("dec") }, "-")
  ]);
}

function updateModel(_msg, _model) {
  if (_msg === "inc") {
    return _model + 1;
  }
  if (_msg === "dec") {
    return _model - 1;
  }
  return _model;
}

// WARNING: impure code below
function app(_model, _update, _view, _node) {
  let model = _model;
  let currentView = _view(dispatch, model);
  _node.appendChild(currentView);

  function dispatch(_msg) {
    // update model state
    model = _update(_msg, model);
    const updatedView = _view(dispatch, model);
    _node.replaceChild(updatedView, currentView);

    // update view state
    currentView = updatedView;
  }
}

const rootNode = document.getElementById("app");
// rootNode.appendChild(createView(updateModel("", initModel)));

app(initModel, updateModel, createView, rootNode);
