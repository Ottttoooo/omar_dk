// Pop Nav Menu
document.getElementById("scrollButton").addEventListener("click", function () {
  const targetSection = document.getElementById("contact");
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
});

document
  .getElementById("menuButton-container")
  .addEventListener("click", function () {
    var nav = document.getElementById("pop-menu");
    if (nav.style.display === "flex") {
      nav.style.display = "none";
    } else {
      nav.style.display = "flex";
    }
  });

const popLinks = document.querySelectorAll(".pop-link");

popLinks.forEach(function (popLink) {
  popLink.addEventListener("click", function (event) {
    var nav = document.getElementById("pop-menu");
    if (nav.style.display === "flex") {
      nav.style.display = "none";
    } else {
      nav.style.display = "flex";
    }
  });
});



// Content Fetcher
const contentfulClient = contentful.createClient({
  accessToken: "QggAadGYoWkmhBKIhdcNog4z42uFNzmzh9ZjbIG8Wr4",
  space: "6jy52b0mp44n",
});

const container = document.getElementById("content-section");

contentfulClient
  .getEntries({
    content_type: "video",
  })
  .then(function (entries) {
    container.innerHTML = renderVideos(entries.items);
    // Initialize
    initializeSlider();
  });

function renderVideos(Videos) {
  return (
    '<div class="carousel">' +
    '<div id="video-slider">' +
    Videos.map(renderSingleVideo).join("\n") +
    "</div>" +
    '<button class="slideButtons" onclick="slideLeft()">❮</button>' +
    '<button class="slideButtons" onclick="slideRight()">❯</button>' +
    '</div>'
  );
}

function renderSingleVideo(Video) {
  var fields = Video.fields;
  console.log(fields);
  return (
    '<div class="Video-in-list">' +
    '<div class="Video-video">' +
    renderVideo(fields.video) +
    '</div>' +
    '<h2 class="video-title">' +
    fields.videoTitle +
    "</h2>" +
    "</div>"
  );
}

function renderVideo(Video) {
  if (Video) {
    return (
      '<video class="stock-videos" controls src="' +
      Video.fields.file.url +
      '" width="100%" >Your browser does not support the video tag.</video>'
    );
  }
}

function getWidthIncludingMargins(element) {
  const computedStyle = window.getComputedStyle(element);
  const marginLeft = parseFloat(computedStyle.marginLeft);
  const marginRight = parseFloat(computedStyle.marginRight);
  const widthIncludingMargins = element.offsetWidth + marginLeft + marginRight;
  return widthIncludingMargins;
}

function initializeSlider() {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.Video-in-list');
  const totalSlides = slides.length;

  // Check if slides are properly selected
  if (totalSlides === 0) {
    console.error('No elements with the class "Video-in-list" found.');
    return;
  }

  function showSlides() {
    const slideWidth = getWidthIncludingMargins(slides[0]);
    console.log(slides[0].clientWidth)
    document.querySelector('#video-slider').style.transform = `translateX(-${slideWidth * slideIndex}px)`;
  }

  function slideRight() {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlides();
  }

  function slideLeft() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlides();
  }

  // Expose functions to global scope for button clicks
  window.slideRight = slideRight;
  window.slideLeft = slideLeft;

  // Initial call to display the first slide
  showSlides();
 
};

