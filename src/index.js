import hh from "hyperscript-helpers";
import {h, diff, patch} from "virtual-dom";
import createElement from "virtual-dom/create-element"

const {div, button} = hh(h);
// const el = document.createElement("p");
// const str = "Hello test";
// const node = document.getElementById('app');
// el.innerHTML = str;
// node.appendChild(el);
const MSGS = {
  INC: "inc"
  , DEC: "dec"
}
const initModel = 0;

function view(_dispatch, _model) {
  return div({className: "ma3"}, [
    div({className: "pa2"}, `Count: ${_model}`)
    , button({className: "pv1 ph2 mr2", onclick: () => _dispatch(MSGS.INC)}, "+")
    , button({className: "pv1 ph2", onclick: () => _dispatch(MSGS.DEC)}, "-")
  ]);
}

function update(_msg, _model) {
  if (_msg === "inc") {
    return _model + 1;
  }
  if (_msg === "dec") {
    return _model - 1;
  }
  return _model;
}

// WARNING: impure code and side-effects
function app(_model, _view, _update, _node) {
  let model = _model;
  let currentView = _view(dispatch, model);
  // virtual-dom intelligently updates only new/modified elements
  let rootNode = createElement(currentView);
  _node.appendChild(rootNode);

  // the dispatch fn will handle updates to the app model
  function dispatch(_msg) {
    model = _update(_msg, model);
    const updatedView = _view(dispatch, model);

    // _node.replaceChild(updatedView, currentView);
    // virtual-dom checks for diff here
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);

    currentView = updatedView;
  }
}

const rootNode = document.getElementById("app");
// rootNode.appendChild(view(update("inc", initModel)));
app(initModel, view, update, rootNode);
