import React, {useContext} from 'react';
import {Card} from 'react-bootstrap';

import './Message.css';

const Message = (props) => {

    const isToday = () => {
        const date = new Date(props.message.datePubli);
        const today = new Date();
        const dateHour = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});

        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return `Today ${dateHour}`;
        } else {
            return date.toLocaleDateString(navigator.language);
        }
    };

    return (
        <Card className="message">
            <Card.Body>
                <Card.Title className="h6">
                    <span className='user'>
                        {props.message.user.username}
                    </span>
                    <span className="date">{isToday()}</span>
                </Card.Title>
            </Card.Body>
            <Card.Text>{props.message.contenu}</Card.Text>
        </Card>
    );
};

export default Message;