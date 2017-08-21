import React from 'react'

const Message = ({
    id,
    subject,
    starred
    }) => (
    <div className="row message unread">
        <div className="col-xs-1">
            <div className="row">
                <div className="col-xs-2">
                    <input type="checkbox" />
                </div>
                <div className="col-xs-2">
                    {starred ? <i className="star fa fa-star"></i> : <i className="star fa fa-star-o"></i>}
                </div>
            </div>
        </div>
        <div className="col-xs-11">
            <a href="#">
                {subject}
        </a>
        </div>
    </div>
)

export default Message