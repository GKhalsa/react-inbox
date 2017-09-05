export const httpUpdateStar = async(id, message) => {
    await fetch("http://localhost:8082/api/messages", {
        method: 'PATCH',
        body: JSON.stringify({
            "messageIds": [id],
            "command": "star",
            "star": !message[0].starred
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }) 
}

export const httpUpdateReadOrUnread = async(noUndefinedIds, booleanValue) => {
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
}

export const httpLabel = async(noUndefinedIds, type,label) => {
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
}

export const httpDeleteMessage = async(noUndefinedIds) => {
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
}