import { useState } from 'react';
import './ActivitySection.css';

function ActivitySection() {
    const activities = [
        {
            icon: 'add_shopping_cart',
            iconBg: 'blue',
            title: 'New order #1234 placed by John Doe.',
            time: '2 minutes ago'
        },
        {
            icon: 'local_shipping',
            iconBg: 'green',
            title: "Order #1229 status changed to 'Shipped'.",
            time: '1 hour ago'
        },
        {
            icon: 'person_add',
            iconBg: 'yellow',
            title: "A new customer 'Jane Smith' has registered.",
            time: '3 hours ago'
        }
    ];

    const [tasks, setTasks] = useState([
        {
            id: 1,
            label: 'Approve measurement for Order #5679',
            priority: 'high',
            completed: false
        },
        {
            id: 2,
            label: 'Follow up with Customer B on payment',
            priority: 'medium',
            completed: false
        },
        {
            id: 3,
            label: 'Restock navy blue silk fabric',
            priority: 'low',
            completed: false
        }
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="activity-section">
            {/* Recent Activity */}
            <div className="activity-card">
                <h3 className="activity-title">Recent Activity</h3>
                <ul className="activity-list">
                    {activities.map((activity, index) => (
                        <li key={index} className="activity-item">
                            <div className={`activity-icon ${activity.iconBg}`}>
                                <span className="material-symbols-outlined">{activity.icon}</span>
                            </div>
                            <div className="activity-content">
                                <p className="activity-text">{activity.title}</p>
                                <p className="activity-time">{activity.time}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Pending Actions */}
            <div className="activity-card">
                <h3 className="activity-title">Pending Actions</h3>
                <ul className="tasks-list">
                    {tasks.map((task) => (
                        <li key={task.id} className="task-item">
                            <input
                                className="task-checkbox"
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                id={`task-${task.id}`}
                            />
                            <label htmlFor={`task-${task.id}`} className="task-label">
                                {task.label}
                            </label>
                            <span className={`task-priority ${task.priority}`}>
                                {task.priority}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ActivitySection;
