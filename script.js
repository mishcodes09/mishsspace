// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const closeMenu = document.getElementById("closeMenu");
const body = document.body;

function openMobileNav() {
  hamburger.classList.add("active");
  mobileNav.classList.add("active");
  body.style.overflow = "hidden"; // Prevent scrolling when menu is open
}

function closeMobileNav() {
  hamburger.classList.remove("active");
  mobileNav.classList.remove("active");
  body.style.overflow = ""; // Restore scrolling
}

// Event Listeners
hamburger.addEventListener("click", openMobileNav);
closeMenu.addEventListener("click", closeMobileNav);

// Close menu when clicking outside content
mobileNav.addEventListener("click", function (e) {
  if (e.target === mobileNav) {
    closeMobileNav();
  }
});

// Close menu with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && mobileNav.classList.contains("active")) {
    closeMobileNav();
  }
});

// Close menu when clicking on mobile nav links
document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

const tooltip = document.getElementById("hover-tooltip");
const images = document.querySelectorAll(".about-images img");

images.forEach((img) => {
  img.addEventListener("mousemove", (e) => {
    tooltip.innerText = img.dataset.tooltip; // get text from data-tooltip
    tooltip.style.left = `${e.pageX}px`;
    tooltip.style.top = `${e.pageY}px`;
    tooltip.style.opacity = 1;
  });

  img.addEventListener("mouseleave", () => {
    tooltip.style.opacity = 0;
  });
});

// Education Timeline Interaction
const timelineYears = document.querySelectorAll(".timeline-year");
const educationContent = document.getElementById("education-content");

// Education data - matches your screenshot
const educationData = {
  2025: {
    degree: "Bsc Computer & Information Science",
    school: "Varsity College",
    dates: "2023 - 2025",
  },
  2024: {
    degree: "Bsc Computer & Information Science",
    school: "Varsity College",
    dates: "2023 - 2025",
  },
  2023: {
    degree: "Bsc Computer & Information Science",
    school: "Varsity College",
    dates: "2023 - 2025",
  },
  2022: {
    degree: "HCert Web & Application Development",
    school: "Varsity College",
    dates: "2022",
  },
  2021: {
    degree: "",
    school: "",
    dates: "",
  },
  2020: {
    degree: "High School",
    school: "Beaconhurst High",
    dates: "2016 - 2020",
  },
};

// Function to update education content
function updateEducationContent(year) {
  const data = educationData[year];

  if (data.degree) {
    educationContent.innerHTML = `
            <div class="education-item">
                <div class="education-degree">${data.degree}</div>
                <div class="education-school">${data.school}</div>
                <div class="education-dates">${data.dates}</div>
            </div>
        `;
  } else {
    educationContent.innerHTML = `
            <div class="education-item">
                <div class="education-school">I took a gap year</div>
            </div>
        `;
  }
}

// Set default active year (2025)
let activeYear = "2025";
timelineYears[0].classList.add("active");

// Add click events to timeline years
timelineYears.forEach((yearElement, index) => {
  yearElement.addEventListener("click", () => {
    const year = yearElement.getAttribute("data-year");

    // Remove active class from all years
    timelineYears.forEach((y) => y.classList.remove("active"));

    // Add active class to clicked year
    yearElement.classList.add("active");

    // Update content
    updateEducationContent(year);
    activeYear = year;
  });
});

// Initialize with 2025 data
updateEducationContent(activeYear);
