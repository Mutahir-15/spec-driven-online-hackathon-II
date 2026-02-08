export const NotificationService = {
  async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications.');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  },

  async sendNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === 'granted') {
      return new Notification(title, {
        icon: '/next.svg', // Default icon
        ...options,
      });
    }
    return null;
  },
};
