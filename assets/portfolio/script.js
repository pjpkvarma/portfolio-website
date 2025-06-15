// Function to toggle the hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Function to enable scrolling for the "Research Papers" section at 80% of the page height
document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const triggerHeight = document.body.scrollHeight * 0.8;
  const researchPapersContainer = document.querySelector(".research-papers-container");

  // Check if user has scrolled 80% of the page height
  if (scrollPosition >= triggerHeight) {
    researchPapersContainer.style.overflowY = "auto"; // Allow scrolling in the research papers section
  } else {
    researchPapersContainer.style.overflowY = "hidden"; // Disable scrolling until 80% is reached
  }
});
