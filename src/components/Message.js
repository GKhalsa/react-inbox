import React from 'react'

const Message = ({
    id,
    subject,
    starred,
    toggleAttribute,
    selected,
    read,
    labels,
    updateStar
}) => (
    <div className={`row message ${read ? "read" : "unread"} ${selected ? "selected" : ""}`}>
        <div className="col-xs-1">
            <div className="row">
                <div className="col-xs-2">
                    <input type="checkbox" checked={!!selected} onChange={e => toggleAttribute(id, "selected")}/>
                </div>
                <div className="col-xs-2" onClick={e => updateStar(id)}>
                    {starred ? <i className="star fa fa-star"></i> : <i className="star fa fa-star-o"></i>}
                </div>
            </div>
        </div>
        <div className="col-xs-11">
            {labels.map((label, i) => {return <span key={i} className="label label-warning">{label}</span>})}

            <a href="#">
                {subject}
        </a>
        </div>
     </div>
)

export default Message