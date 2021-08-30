import { combineReducers } from 'redux'

import newPartyReducer from './PartyReducer'
import removeListenerReducer from './RemoveListenerReducer'

const rootReducer = combineReducers({
    newParty: newPartyReducer,
    removeListener: removeListenerReducer
})



export default rootReducer
