// Dynamically add the footer
const footerHTML = `
  <footer class="footer">
    <div class="footer-container">
      <!-- Logo and Name -->
      <div class="footer-brand">
        <img src="/uploads/branding/favicon.png" alt="Site Logo" class="footer-logo">
        <span class="footer-name">Starship</span>
        
      </div>
      <span>Thank you for using our website.</span>
      <!-- Links -->
      <div class="footer-links">
        <a href="/">Home</a>
        <hr>
        <a href="/privacy">Privacy Policy</a>
        <hr>
        <a href="/terms">Terms of Service</a>
        <hr>
        <a href="/license">Code License</a>
        <hr>
        <a href="/contact">Contact Us</a>
      </div>
      <button style="font-size:15px;background:none;background-color:transparent;padding:none;text-decoration:underline;" id="toggleFooter" class="hide-button"><span class="fa fa-remove fa-2x"></button>
    </div>
  </footer>
`;

// Append the footer to the body
document.body.insertAdjacentHTML("beforeend", footerHTML);

// JavaScript to hide the footer when the button is clicked
const hideButton = document.getElementById('toggleFooter');
const footer = document.querySelector('.footer');

hideButton.addEventListener('click', () => {
  footer.classList.add('hidden');  // Hide the footer
});

// Add screen time tracker script

// Create a new script element
var script = document.createElement('script');

// Set the source to your screenTimeTracker.js file
script.src = '/javascript/screentimetracking.js';

// (Optional) Set the script to load asynchronously
script.async = true;

// Append the script to the document's head (or body)
document.head.appendChild(script);

// Alternatively, you can append it to the body:
// document.body.appendChild(script);


// Add gtag tracking
// Create the <script> element for the Google tag (gtag.js)
var script1 = document.createElement('script');
script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-MKDF11ZW6N';
script1.async = true;

// Create the inline <script> for initializing gtag
var script2 = document.createElement('script');
script2.text = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MKDF11ZW6N');
`;

// Find the <head> element and insert the scripts after it
var head = document.getElementsByTagName('head')[0];
head.appendChild(script1);
head.appendChild(script2);
