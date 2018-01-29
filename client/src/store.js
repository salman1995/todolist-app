import {applyMiddleware,createStore} from "redux";
import reducer from "./reducers"

import thunk from "redux-thunk"
import promise from "redux-promise-middleware";

const middleware = applyMiddleware(promise(),thunk)
export default createStore(reducer, middleware)