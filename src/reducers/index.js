import { combineReducers } from 'redux'
import { POPULATE_MESSAGES, UPDATE_STAR, UPDATE_SELECTED, SELECT_DESELECT,
         MARK_AS_READ_OR_UNREAD, DELETE_SELECTED_MESSAGES, ADD_LABEL, REMOVE_LABEL} from '../actions/index.js'


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

        case SELECT_DESELECT: 
            const massSelectDeselect = state.all.map((message) => { return { ...message, selected: action.booleanValue } })        
            return {...state, all: massSelectDeselect}    

        case MARK_AS_READ_OR_UNREAD: 
            const markedReadOrUnread = state.all.map((message) => {
                if (message.selected) { return { ...message, read: action.booleanValue } }
                return message
            })
            return { ...state, all: markedReadOrUnread }

        case DELETE_SELECTED_MESSAGES: 
            const nonDeletedMessages = state.all.filter((message) => {return !message.selected})
            return {...state, all: nonDeletedMessages}    
           
        case ADD_LABEL: 
            const messagesWithAddedLabels = state.all.map((message) => {
                if (message.selected) { return { ...message, labels: [...new Set([...message.labels, action.label])] } }
                return message
            })
            return {...state, all: messagesWithAddedLabels}    

        case REMOVE_LABEL: 
            const messagesWithRemovedLabels = state.all.map((message) => {
                const updatedLabels = message.labels.filter((label) => { return label != action.label })
                if (message.selected) { return { ...message, labels: updatedLabels } }
                return message
            })    
            return { ...state, all: messagesWithRemovedLabels }    
        default: 
            return state        
    }

    
}


export default combineReducers({
    messages
})