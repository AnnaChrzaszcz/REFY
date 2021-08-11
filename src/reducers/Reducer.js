import { combineReducers } from 'redux'

import newPartyReducer from './PartyReducer'

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    newParty: newPartyReducer,
})



export default rootReducer
