'use client';

import { useEffect } from 'react';

export default function Notification({ show, message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  // Define styles based on notification type
  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-600',
          iconBg: 'bg-green-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ),
          closeHover: 'text-green-200 hover:text-white'
        };
      case 'error':
        return {
          bg: 'bg-red-600',
          iconBg: 'bg-red-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
          closeHover: 'text-red-200 hover:text-white'
        };
      case 'info':
        return {
          bg: 'bg-blue-600',
          iconBg: 'bg-blue-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          closeHover: 'text-blue-200 hover:text-white'
        };
      default:
        return {
          bg: 'bg-green-600',
          iconBg: 'bg-green-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ),
          closeHover: 'text-green-200 hover:text-white'
        };
    }
  };

  const styles = getStyles(type);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`flex items-center gap-3 ${styles.bg} text-white px-4 py-3 rounded-lg shadow-lg`}>
        {/* Icon */}
        <div className={`w-6 h-6 rounded-full ${styles.iconBg} flex items-center justify-center`}>
          {styles.icon}
        </div>
        {/* Message */}
        <span className="text-sm font-medium">{message}</span>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`ml-2 ${styles.closeHover} transition-colors`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
