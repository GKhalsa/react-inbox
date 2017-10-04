export const POPULATE_MESSAGES = 'POPULATE_MESSAGES';
export function fetchMessages(){
    return async (dispatch) => {
        const response = await fetch("http://localhost:8082/api/messages")
        const json = await response.json()
        dispatch({
            type: POPULATE_MESSAGES,
            messages: json._embedded.messages
        })
    }
}

export const UPDATE_STAR = 'UPDATE_STAR'
export function updateStar(id, starred) {
    return async (dispatch) => {
        await fetch("http://localhost:8082/api/messages", {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": [id],
                "command": "star",
                "star": !starred
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        dispatch({
            type: UPDATE_STAR,
            id
        })
    }
}

export const UPDATE_SELECTED = 'UPDATE_SELECTED'
export function updateSelected(id){
    return async (dispatch) => {
        dispatch({
            type: UPDATE_SELECTED,
            id
        })
    }
}

export const SELECT_DESELECT = 'SELECT_DESELECT'
export function selectDeselect(booleanValue){
    return async (dispatch) => {
        dispatch({
            type: SELECT_DESELECT,
            booleanValue: !booleanValue        
        })
    }
}

export const MARK_AS_READ_OR_UNREAD = 'MARK_AS_READ_OR_UNREAD'
export function markAsReadOrUnread(booleanValue, messages){

    const ids = messages.map((message) => { if (message.selected) { return message.id } return })
    const noUndefinedIds = ids.filter(Number)

    return async (dispatch) => {
        await fetch("http://localhost:8082/api/messages", {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": [...noUndefinedIds],
                "command": "read",
                "read": booleanValue
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        dispatch({
            type: MARK_AS_READ_OR_UNREAD,
            booleanValue
        })
    }
}

export const DELETE_SELECTED_MESSAGES = 'DELETE_SELECTED_MESSAGES'
export function deleteSelectedMessages(messages){
    const ids = messages.map((message) => { if (message.selected) { return message.id } return })
    const noUndefinedIds = ids.filter(Number)
    return async (dispatch) => {
        await fetch("http://localhost:8082/api/messages", {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": [...noUndefinedIds],
                "command": "delete",
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })     
        
    dispatch({
        type: DELETE_SELECTED_MESSAGES
    })    
    }
}

export const ADD_LABEL = 'ADD_LABEL'
export const REMOVE_LABEL = 'REMOVE_LABEL'
export function addRemoveLabel(e, type, messages){

    const ids = messages.map((message) => { if (message.selected) { return message.id } return })
    const noUndefinedIds = ids.filter(Number)
    const label = e.target.value 

    return async (dispatch) => {
        await fetch("http://localhost:8082/api/messages", {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": [...noUndefinedIds],
                "command": type,
                "label": label
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        if (type == "addLabel") {
            dispatch({
                type: ADD_LABEL,
                label
            })
        } else {
            dispatch({
                type: REMOVE_LABEL,
                label
            })
        }
    }
}

export const NEW_MESSAGE = 'NEW_MESSAGE'
export function newMessage(e){
    const subject = e.target.subject.value
    const body = e.target.body.value
    
    return async (dispatch) => {
        const response = await fetch("http://localhost:8082/api/messages", {
            method: 'POST',
            body: JSON.stringify({
                "subject": subject,
                "body": body,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        const json = await response.json()
        

        dispatch({
            type: NEW_MESSAGE,
            newMessage: json, 
            formOpen: false    
        })
    }
}

export const OPEN_FORM = 'OPEN_FORM'
export function openForm(){
    return async (dispatch) => {
        dispatch({
            type: OPEN_FORM
        })
    }
}