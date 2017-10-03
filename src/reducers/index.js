import { combineReducers } from 'redux'
import { POPULATE_MESSAGES, UPDATE_STAR, UPDATE_SELECTED} from '../actions/index.js'


function messages(state = {all:[]}, action) {
    switch (action.type){
        
        case POPULATE_MESSAGES:
            return {...state, all: action.messages}
        
        case UPDATE_STAR: 
            const updatedMessages = state.all.map((message) => {
                if (message.id === action.id) { return { ...message, "starred": !message.starred } }
                return message
            })
            return {...state, all: updatedMessages}
            
        case UPDATE_SELECTED:
            const updatedSelectedMessages = state.all.map((message) => {
                if (message.id === action.id) { return { ...message, "selected": !message.selected } }
                return message
            })
            return { ...state, all: updatedSelectedMessages }


        default: 
            return state        
    }

    
}


export default combineReducers({
    messages
})