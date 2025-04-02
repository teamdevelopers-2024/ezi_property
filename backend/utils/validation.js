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

  // Check if email ends with @gmail.com
  if (!email.endsWith('@gmail.com')) {
    return 'Email must be a Gmail address';
  }

  // Basic email format validation for the part before @gmail.com
  const localPart = email.split('@')[0];
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) {
    return 'Invalid email format';
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