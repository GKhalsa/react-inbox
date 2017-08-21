import React from 'react'

const Message = ({
    id,
    subject,
    starred,
    toggleStarring,
    toggleSelect,
    selected
}) => (
    <div className={`row message unread ${selected ? "selected" : ""}`}>
        <div className="col-xs-1">
            <div className="row">
                <div className="col-xs-2">
                    <input type="checkbox" onClick={e => toggleSelect(id)}/>
                </div>
                <div className="col-xs-2" onClick={e => toggleStarring(id)}>
                    {starred ? <i className="star fa fa-star"></i> : <i className="star fa fa-star-o"></i>}
                </div>
            </div>
        </div>
        <div className="col-xs-11">
            <a href="#">
                {subject}
        </a>
        </div>
    // </div>
)

export default Message

//TODO: all the toggles can be same function just pass param to toggle