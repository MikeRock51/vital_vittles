export function getTimeOfDay() {
    const currentHour = new Date().getHours();
  
    if (currentHour >= 4 && currentHour < 12) {
      return 'Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  }
