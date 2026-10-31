const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
  const message = contactForm.querySelector('[data-form-message]');
  const requiredFields = [...contactForm.querySelectorAll('[required]')];

  function validateField(field) {
    const error = document.getElementById(`${field.id}-error`);
    const value = field.value.trim();
    let errorText = '';

    if (!value) errorText = 'Please complete this field.';
    else if (field.type === 'email' && !field.validity.valid) errorText = 'Enter a valid email address.';

    field.setAttribute('aria-invalid', String(Boolean(errorText)));
    if (error) error.textContent = errorText;
    return !errorText;
  }

  requiredFields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.hasAttribute('aria-invalid')) validateField(field);
    });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const valid = requiredFields.map(validateField).every(Boolean);
    if (!valid) {
      message.className = 'form-message form-message--error';
      message.textContent = 'Please correct the highlighted fields before continuing.';
      contactForm.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const name = contactForm.elements.parentName.value.trim();
    const email = contactForm.elements.email.value.trim();
    const phone = contactForm.elements.phone.value.trim();
    const childClass = contactForm.elements.childClass.value.trim();
    const enquiry = contactForm.elements.message.value.trim();
    const whatsappMessage = [
      'Hello Inward Peace Academy, I would like to make an enquiry.',
      '',
      `Parent / Guardian: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      childClass ? `Child's Age / Class: ${childClass}` : '',
      `Message: ${enquiry}`
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/2347068838101?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    message.className = 'form-message form-message--success';
    message.textContent = 'Your WhatsApp enquiry has been prepared. Send the message to the school to complete your enquiry.';
  });
}