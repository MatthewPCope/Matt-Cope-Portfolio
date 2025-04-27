// set current year
const yearEl = document.querySelector(".year")
const currentYear = new Date().getFullYear()
yearEl.textContent = currentYear

// make mobile nav work
const btnNavEl = document.querySelector('.btn-mobile-nav')
const headerEl = document.querySelector(".header")

btnNavEl.addEventListener('click', () => {
  headerEl.classList.toggle("nav-open")
})

// Sticky Navigation //

const sectionHeroEl = document.querySelector('.section-hero')

const observer = new IntersectionObserver(([entry])=>{
  document.body.classList.toggle('sticky', !entry.isIntersecting)
}, 
{
  root: null,
  threshold: 0,
  rootMargin: '-80px'
})
observer.observe(sectionHeroEl)

///////////////////////////////////////////////////////////
// Smooth scrolling animation ***this doesn't need to be here, it works without it*****

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// Initialize EmailJS
(function() {
  emailjs.init("EpUlmZbL0nsJI0Bbw"); // Replace with your actual EmailJS user ID
})();

// Contact Form Submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_4v1ia7k', 'template_gm8o1s8', this)
      .then(() => {
        const formMessage = document.getElementById('form-message');
        formMessage.classList.remove('hidden');

        setTimeout(() => {
          formMessage.classList.add('hidden');
        }, 3000); // Hide message after 3 seconds

        this.reset();
      }, (error) => {
        alert('Failed to send the message, please try again.');
        console.error('FAILED...', error);
      });
  });
}