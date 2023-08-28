// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Collect form data
  let formData = {
    name: event.target.name.value,
    email: event.target.email.value,
    message: event.target.message.value
  };

  // Send data to SendGrid
  sendEmail(formData);
});

function sendEmail(data) {
  const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';
  const SENDGRID_API_KEY = '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'; // SendGrid API key
  const TEMPLATE_ID = 'd-db2e8be953b94f419f2fe34e530a9e8b'; // SendGrid template ID

  const emailData = {
    personalizations: [{
      to: [{ email: 'sam.sarantos@gmail.com' }],
      dynamic_template_data: {
        subject: "New Contact Form Submission",
        name: data.name,
        email: data.email,
        message: data.message
      }
    }],
    from: { email: 'sam.sarantos@gmail.com', name: 'Portfolio Contact Form' }, 
  };

  fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SENDGRID_API_KEY}`
    },
    body: JSON.stringify(emailData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.errors) {
      console.error('Failed to send email:', data.errors);
      alert('Failed to send message. Please try again later.');
    } else {
      alert('Message sent successfully!');
    }
  })
  .catch(error => {
    console.error('Error sending email:', error);
    alert('Failed to send message. Please try again later.');
  });
}

