// public/scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('messageForm');
  const status = document.getElementById('formStatus');
  const rentNowBtn = document.getElementById('rentNowBtn');

  // Rent now scroll
  rentNowBtn?.addEventListener('click', () => {
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: 'smooth' });
  });

  // Form submit
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.innerText = 'Sending...';

    const payload = {
      name: form.name.value?.trim() || '',
      address: form.address.value?.trim() || '',
      mobile: form.mobile.value?.trim() || '',
      whatsapp: form.whatsapp.value?.trim() || '',
      message: form.message?.value?.trim() || ''
    };

    try {
      const res = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      if (res.ok) {
        status.innerText = '✅ Message sent. We will contact you shortly.';
        form.reset();
      } else {
        status.innerText = text || '❌ Failed to send. Try again.';
      }
    } catch (err) {
      console.error('Submit error:', err);
      status.innerText = 'Network error. Please try again later.';
    }

    setTimeout(() => { status.innerText = ''; }, 5000);
  });
});

// prefill helper for book buttons
function prefill(model) {
  const contact = document.getElementById('contact');
  if (contact) contact.scrollIntoView({ behavior: 'smooth' });
  const msgBox = document.querySelector('textarea[name="message"]');
  if (msgBox) msgBox.value = `I want to book: ${model}. Preferred date: `;
}
