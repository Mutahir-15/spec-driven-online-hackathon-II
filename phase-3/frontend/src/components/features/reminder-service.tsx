'use client';

import { useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { Item } from '@/types';
import { NotificationService } from '@/lib/notifications';

export const ReminderService = () => {
  const notifiedTasks = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Request notification permission on mount
    NotificationService.requestPermission();

    const checkReminders = async () => {
      try {
        // Fetch pending items
        const items = await api.get<Item[]>('/items/?completed=false');
        
        const now = new Date();
        
        items.forEach(item => {
          if (!item.due_date || notifiedTasks.current.has(item.id)) return;

          const dueDateTime = new Date(`${item.due_date}T${item.due_time || '00:00:00'}`);
          
          // If task is due now or in the past (but within the last hour to avoid old spam)
          const timeDiff = now.getTime() - dueDateTime.getTime();
          
          if (timeDiff >= 0 && timeDiff < 3600000) {
            NotificationService.sendNotification(`Task Due: ${item.title}`, {
              body: item.description || 'Your task is due now!',
              tag: `task-${item.id}`
            });
            notifiedTasks.current.add(item.id);
          }
        });
      } catch (error) {
        console.error('Failed to check reminders:', error);
      }
    };

    // Check every minute
    const interval = setInterval(checkReminders, 60000);
    
    // Initial check
    checkReminders();

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
};
