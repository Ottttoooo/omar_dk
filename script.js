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

const container = document.getElementById("content");

contentfulClient
  .getEntries({
    content_type: "video",
  })
  .then(function (entries) {
    console.log(entries);
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
    '<button class="slideButtons" onclick="slideLeft()"><i class="fa-solid fa-arrow-left"></i></button>' +
    '<button class="slideButtons" onclick="slideRight()"><i class="fa-solid fa-arrow-right"></i></button>' +
    '</div>'
  );
}

function renderSingleVideo(Video) {
  var fields = Video.fields;
  return (
    '<div class="Video-in-list">' +
    '<div class="Video-video">' +
    renderVideo(fields) +
    '</div>' +
    '<h2 class="video-title">' +
    fields.videoTitle +
    "</h2>" +
    "</div>"
  );
}

function renderVideo(fields) {
  if (fields.video) {
    return (
      '<video class="stock-videos" controls src="' +
      fields.video.fields.file.url +
      '" width="100%" poster="' +
      fields.thumbnail.fields.file.url +
      '">Your browser does not support the video tag.</video>'
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


  // Create an IntersectionObserver instance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('video');
      if (entry.isIntersecting) {
        video.setAttribute('controls', 'controls');
        // Force reflow
        video.style.display = 'none';
        video.offsetHeight; // Trigger reflow
        video.style.display = 'block';
      } else {
        video.removeAttribute('controls');
      }
    });
  }, {
    threshold: 1 // Adjust as necessary to determine when the video is considered fully visible
  });


  // Observe each slide
  slides.forEach(slide => {
    observer.observe(slide);
  });

  function showSlides() {
    const slideWidth = getWidthIncludingMargins(slides[0]);
    document.querySelector('#video-slider').style.transform = `translateX(-${slideWidth * (slideIndex)}px)`;

  // Remove the active class from all slides and remove controls from videos
    slides.forEach(slide => {
      slide.classList.remove('active');
      const video = slide.querySelector('video');
      video.removeAttribute('controls');
    });

    // Add the active class to the current slide and add controls to the active video
    slides[slideIndex].classList.add('active');
    const activeVideo = slides[slideIndex].querySelector('video');
    activeVideo.setAttribute('controls', 'controls');

    // // Force re-render by temporarily removing and re-adding the video element
    // setTimeout(() => {
    //   activeVideo.style.display = 'none';
    //   activeVideo.offsetHeight; // Trigger reflow
    //   activeVideo.style.display = 'block';
    // }, 0);
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

