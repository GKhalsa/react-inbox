// export const PRODUCTS_RECEIVED = 'PRODUCTS_RECEIVED'
// export function fetchProducts() {
//     return async (dispatch) => {
//         const response = await fetch(`http://localhost:8082/api/products`)
//         const json = await response.json()
//         dispatch({
//             type: PRODUCTS_RECEIVED,
//             products: json._embedded.products
//         })
//     }
// }

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