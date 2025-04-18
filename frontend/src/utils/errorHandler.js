export const sanitizeInput = (value) => {
  return value.trim();
};

export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error
    switch (error.response.status) {
      case 400:
        return error.response.data.message || 'Invalid request. Please check your input.';
      case 401:
        return 'Authentication failed. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return error.response.data.message || 'This resource already exists.';
      case 422:
        return error.response.data.message || 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.response.data.message || 'An unexpected error occurred.';
    }
  } else if (error.request) {
    // Request was made but no response
    return 'Unable to connect to the server. Please check your internet connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred.';
  }
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  return errors;
};

export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }

  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return null;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return 'Phone number must be exactly 10 digits';
  }
  return null;
};

export const validateName = (name) => {
  // Allow empty value (validation will be handled by required attribute)
  if (name === '') {
    return null;
  }
  
  // Check if name starts and ends with letters, and contains only letters and spaces
  if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(name)) {
    return 'Name must contain only letters and single spaces between words';
  }
  if (name.length < 2) {
    return 'Name must be at least 2 characters long';
  }
  if (/\s{2,}/.test(name)) {
    return 'Name cannot contain consecutive spaces';
  }
  return null;
}; 