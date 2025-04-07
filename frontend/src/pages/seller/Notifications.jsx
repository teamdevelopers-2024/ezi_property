import React, { useState } from 'react';
import { Bell, Check, X, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'property',
      message: 'Your property listing has been approved',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'inquiry',
      message: 'New inquiry received for your property',
      timestamp: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'system',
      message: 'Welcome to EZI Property! Complete your profile to get started',
      timestamp: '2 days ago',
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'property':
        return <Bell className="w-5 h-5 text-[#F3703A]" />;
      case 'inquiry':
        return <Bell className="w-5 h-5 text-blue-500" />;
      case 'system':
        return <Bell className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <button 
          className="text-sm text-gray-600 hover:text-[#F3703A] transition-colors"
          onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl shadow-sm p-4 ${
                !notification.read ? 'border-l-4 border-[#F3703A]' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications; 