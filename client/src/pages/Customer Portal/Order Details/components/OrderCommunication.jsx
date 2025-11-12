import { useState } from 'react';
import './OrderCommunication.css';

function OrderCommunication() {
    const [messages] = useState([
        {
            id: 1,
            sender: 'tailor',
            text: 'Your measurements have been confirmed. We will start the tailoring process shortly.',
            time: 'Tailor - June 2, 10:30 AM'
        },
        {
            id: 2,
            sender: 'customer',
            text: 'Thank you for the update!',
            time: 'You - June 2, 10:35 AM'
        }
    ]);

    const [messageText, setMessageText] = useState('');

    const handleSend = () => {
        if (messageText.trim()) {
            console.log('Send message:', messageText);
            setMessageText('');
        }
    };

    return (
        <div className="order-communication-card">
            <h2 className="order-communication-title">Communication</h2>
            <div className="order-communication-content">
                <div className="order-communication-messages">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`order-communication-message ${message.sender === 'customer' ? 'customer' : 'tailor'}`}
                        >
                            <div className="order-communication-avatar">
                                <span className="material-symbols-outlined">
                                    {message.sender === 'customer' ? 'person' : 'store'}
                                </span>
                            </div>
                            <div className="order-communication-bubble-wrapper">
                                <div className="order-communication-bubble">
                                    <p className="order-communication-text">{message.text}</p>
                                </div>
                                <p className="order-communication-time">{message.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="order-communication-input-wrapper">
                    <input
                        className="order-communication-input"
                        type="text"
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button className="order-communication-send-button" onClick={handleSend}>
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderCommunication;
