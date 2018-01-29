import { combineReducers } from "redux"

import app from "./appReducer"
import list from "./listReducer"
export default combineReducers({
  list,app
})
