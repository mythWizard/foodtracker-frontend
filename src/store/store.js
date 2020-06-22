import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import entryReducer from '../reducers/entryReducer'
import userReducer from '../reducers/userReducer'
import dateReducer from '../reducers/dateReducer'

const combo = combineReducers({entries: entryReducer, user: userReducer, date: dateReducer})

const store = createStore(combo, composeWithDevTools(applyMiddleware(thunk)))

export default store