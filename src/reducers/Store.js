import { createStore } from 'redux'
import rootReducer from './Reducer'

let preloadedState
const persistedTodosString = localStorage.getItem('todos')

/*if (persistedTodosString) { //TODO tu inicjoeac czy w PartyReducer?
    preloadedState = {
        todos: JSON.parse(persistedTodosString)
    }
}*/

const store = createStore(rootReducer)

export default store
