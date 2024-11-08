const colorsLi = document.querySelectorAll(".colors-list li");
// Check if There Is a color in Local Storage
if (localStorage.getItem("colorOption")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("colorOption")
  );
  // Select the Li with data-color == local Storage Color Option
  let selectedLi = document.querySelector(
    `[data-color = '${localStorage.getItem("colorOption")}']`
  );
  handleActive(colorsLi, selectedLi);
}
// Random Background Option
let backgroundOption = true;
// Variable to Control the Background Interval
let backgroundInterval;
// Check if There Is Random Background Item in Local Storage
if (localStorage.getItem("background-option") !== null) {
  backgroundOption = JSON.parse(localStorage.getItem("background-option"));
  // Remove Active Class From All Random Backgrounds Spans
  document.querySelectorAll(".random-backgrounds span").forEach((el) => {
    el.classList.remove("active");
  });
  // Add Active Class
  backgroundOption
    ? document.querySelector(".random-backgrounds .yes").classList.add("active")
    : document.querySelector(".random-backgrounds .no").classList.add("active");
}
document.querySelector(".toggle-settings i").onclick = function () {
  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};
// Loop on All Lis
colorsLi.forEach((li) => {
  // Click on Every List Item
  li.addEventListener("click", (e) => {
    // Set Color on Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("colorOption", e.target.dataset.color);
    handleActive(colorsLi, e.target);
  });
});
// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop on All Spans
randomBackEl.forEach((span) => {
  // Click on Every Span
  span.addEventListener("click", (e) => {
    handleActive(randomBackEl, e.target);
    // Check the Option Status
    if (e.target.classList.contains("yes")) {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// Function to Randomize Images
function randomizeImgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change Background Image Url
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 1000);
  }
}
randomizeImgs();
// Select Skills Selector
let ourSkills = document.querySelector(".skills");
let spansProg = Array.from(document.querySelectorAll(".skill-progress span"));
// Fill Skills
window.onscroll = function () {
  if (scrollY > ourSkills.offsetTop - 100) {
    spansProg.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};
// Create Popup With the Image
let ourGallery = Array.from(document.querySelectorAll(".gallery img"));
ourGallery.forEach((img) => {
  img.addEventListener("click", (event) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // Add Class to Overlay
    overlay.className = "popup-overlay";
    // Append Overlay Element to the Body
    document.body.append(overlay);
    // Create the Popup Box
    let popupBox = document.createElement("div");
    // Add Class to the Popup Box
    popupBox.className = "popup-box";
    // Create the Image
    let popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = img.src;
    // Add Image to Popup Box
    popupBox.append(popupImage);
    // Append the popup Box to Body
    document.body.append(popupBox);
    if (img.alt) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // Create Heading Text
      let imgText = document.createTextNode(img.alt);
      // Append the Text to the Heading
      imgHeading.append(imgText);
      // Append the Heading to Popup Box
      popupBox.prepend(imgHeading);
    }
    // Create the Close Span
    let closeButton = document.createElement("span");
    // Create the Close Button Text
    let closeButtonText = document.createTextNode("X");
    // Append Text to Close Button
    closeButton.append(closeButtonText);
    // Add Class to Close Button
    closeButton.className = "close-button";
    // Add Close Button to Popup Box
    popupBox.append(closeButton);
  });
});
// Close Popup
document.addEventListener("click", (event) => {
  if (event.target.className == "close-button") {
    // Remove the Current Popup
    event.target.parentElement.remove();
    // Remove the Overlay
    document.querySelector(".popup-overlay").remove();
  }
});
// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select All Links
const allLinks = document.querySelectorAll(".links a");
// Function to Scroll to Somewhere
function scrollToSomewhere(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      document
        .querySelector(event.currentTarget.dataset.section)
        .scrollIntoView({
          behavior: "smooth",
        });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
if (localStorage.getItem("bullets-option")) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (localStorage.getItem("bullets-option") == "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.classList.contains("yes")) {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActive(bulletsSpan, e.target);
  });
});
// Reset Options
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
// Handle Active Function
function handleActive(array, element) {
  // Remove Active Class From All Elements
  array.forEach((el) => {
    el.classList.remove("active");
  });
  // Add Active Class To The Clicked Span
  element.classList.add("active");
}
// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  // Toggle Class menu-active on Button
  this.classList.toggle("menu-active");
  // Toggle Class open on Links
  theLinks.classList.toggle("open");
};
// Click Anywhere Outside Menu and Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== theLinks) {
    // Check if Menu Is Open
    if (theLinks.classList.contains("open")) {
      theLinks.classList.remove("open");
      toggleBtn.classList.remove("menu-active");
    }
  }
});
// Stop Propagation on Menu
theLinks.onclick = function (e) {
  e.stopPropagation();
};
// Add the Year to Footer Dynamically
let year = document.querySelector(".m-year");
let dateNow = new Date();
year.innerHTML = dateNow.getFullYear();
