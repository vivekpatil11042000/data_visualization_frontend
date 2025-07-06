/**
 * Utility functions for date and time formatting
 */

/**
 * Formats a timestamp (in milliseconds) to a human-readable date and time string
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (timestamp) => {
  if (!timestamp || typeof timestamp !== 'number') {
    return 'Invalid date';
  }

  try {
    const date = new Date(timestamp);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    // Format options for a readable date and time
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    };

    return date.toLocaleString('en-US', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Formats a timestamp to show relative time (e.g., "2 minutes ago")
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (timestamp) => {
  if (!timestamp || typeof timestamp !== 'number') {
    return 'Unknown time';
  }

  try {
    const now = Date.now();
    const diffMs = now - timestamp;
    
    // Convert to seconds
    const diffSeconds = Math.floor(diffMs / 1000);
    
    if (diffSeconds < 60) {
      return `${diffSeconds} second${diffSeconds !== 1 ? 's' : ''} ago`;
    }
    
    // Convert to minutes
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
    
    // Convert to hours
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    
    // Convert to days
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
    
    // For older dates, just show the formatted date
    return formatDateTime(timestamp);
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return 'Unknown time';
  }
};

/**
 * Formats a timestamp to a simple date string (YYYY-MM-DD)
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const formatDate = (timestamp) => {
  if (!timestamp || typeof timestamp !== 'number') {
    return 'Invalid date';
  }

  try {
    const date = new Date(timestamp);
    
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Formats a timestamp to a simple time string (HH:MM:SS)
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Time string in HH:MM:SS format
 */
export const formatTime = (timestamp) => {
  if (!timestamp || typeof timestamp !== 'number') {
    return 'Invalid time';
  }

  try {
    const date = new Date(timestamp);
    
    if (isNaN(date.getTime())) {
      return 'Invalid time';
    }

    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid time';
  }
};
