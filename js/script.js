
const yearEl = document.querySelector(".year")
const currentYear = new Date().getFullYear()
yearEl.textContent = currentYear


const btnNavEl = document.querySelector('.btn-mobile-nav')
const headerEl = document.querySelector(".header")

btnNavEl.addEventListener('click', () => {
  headerEl.classList.toggle("nav-open")
})

// Sticky Navigation

const header = document.querySelector('.header');
const heroSection = document.querySelector('.section-hero');

const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];

    if (!entry.isIntersecting) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-96px",
  }
);

observer.observe(heroSection);

///////////////////////////////////////////////////////////
// Smooth scrolling animation ***this doesn't need to be here, it works without it*****

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Only prevent default for internal links
    if (href && href.startsWith("#")) {
      e.preventDefault();

      // Scroll back to top
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Scroll to other links
      else {
        const sectionEl = document.querySelector(href);
        if (sectionEl) {
          sectionEl.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Close mobile navigation
      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.toggle("nav-open");
      }
    }
    // Otherwise (external link like GitHub, LinkedIn, Email) — do nothing, allow browser to handle
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


(function() {
  emailjs.init("EpUlmZbL0nsJI0Bbw");
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
        }, 3000);

        this.reset();
      }, (error) => {
        alert('Failed to send the message, please try again.');
        console.error('FAILED...', error);
      });
  });
}
