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

// updateStar = (id) => {
//     let message = this.state.messages.filter((message) => { return message.id === id })
//     httpUpdateStar(id, message)
//     this.toggleAttribute(id, "starred")

// }

// export const httpUpdateStar = async (id, message) => {
//     await fetch("http://localhost:8082/api/messages", {
//         method: 'PATCH',
//         body: JSON.stringify({
//             "messageIds": [id],
//             "command": "star",
//             "star": !message[0].starred
//         }),
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         }
//     })
// }