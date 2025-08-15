export interface ValidationError {
  field: string
  message: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateContactForm = (data: ContactFormData): ValidationError[] => {
  const errors: ValidationError[] = []

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'İsim alanı zorunludur' })
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'İsim en az 2 karakter olmalıdır' })
  } else if (data.name.trim().length > 50) {
    errors.push({ field: 'name', message: 'İsim en fazla 50 karakter olabilir' })
  }

  // Email validation
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Email alanı zorunludur' })
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Geçerli bir email adresi giriniz' })
  }

  // Subject validation
  if (!data.subject.trim()) {
    errors.push({ field: 'subject', message: 'Konu alanı zorunludur' })
  } else if (data.subject.trim().length < 5) {
    errors.push({ field: 'subject', message: 'Konu en az 5 karakter olmalıdır' })
  } else if (data.subject.trim().length > 100) {
    errors.push({ field: 'subject', message: 'Konu en fazla 100 karakter olabilir' })
  }

  // Message validation
  if (!data.message.trim()) {
    errors.push({ field: 'message', message: 'Mesaj alanı zorunludur' })
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Mesaj en az 10 karakter olmalıdır' })
  } else if (data.message.trim().length > 1000) {
    errors.push({ field: 'message', message: 'Mesaj en fazla 1000 karakter olabilir' })
  }

  return errors
}

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
}
