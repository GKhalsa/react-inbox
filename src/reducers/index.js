import { combineReducers } from 'redux'

function items(state = { all: [] }, action) {
    // switch (actio?n.type) {
        // case ITEMS_RECEIVED:
        //     return {
        //         ...state,
        //         all: action.items
        //     }
        // case ITEM_CREATED:
        //     return {
        //         ...state,
        //         all: [
        //             action.item,
        //             ...state.all,
        //         ]
        //     }
        // default:
            return state
    // }
}


export default combineReducers({
    items
})