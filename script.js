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

const contentfulClient = contentful.createClient({
  accessToken: "Hb_pGA3h19HsSpdEmJEsnM4N_Gg0z4bq8tvx1J9PY4w",
  space: "8swtev1r1drx",
});

const container = document.getElementById("content-container");

contentfulClient
  .getEntries({
    content_type: "video",
  })
  .then(function (entries) {
    container.innerHTML = renderVideos(entries.items);
  });

function renderVideos(Videos) {
  return (
    '<div class="Videos">' + Videos.map(renderSingleVideo).join("\n") + "</div>"
  );
}

function renderSingleVideo(Video) {
  var fields = Video.fields;
  console.log(fields);
  return (
    '<div class="Video-in-list">' +
    '<div class="Video-video">' +
    renderVideo(fields.video) +
    "</div>" +
    '<div class="video-details">' +
    // renderVideoDetails(fields) +
    "</div>" +
    "</div>"
  );
  console.log("after renderVideos");
}

function renderVideoDetails(fields) {
  return (
    renderVideoHeader(fields) +
    '<p class="Video-categories">' +
    fields.categories
      .map(function (category) {
        return category.fields.title;
      })
      .join(", ") +
    "</p>" +
    "<p>" +
    marked(fields.VideoDescription) +
    "</p>" +
    "<p>" +
    fields.price +
    " &euro;</p>" +
    '<p class="Video-tags"><span>Tags:</span> ' +
    fields.tags.join(", ") +
    "</p>"
  );
}

function renderVideoHeader(fields) {
  return (
    '<div class="Video-header">' +
    "<h2>" +
    '<a href="Video/' +
    fields.slug +
    '">' +
    fields.VideoName +
    "</a>" +
    "</h2>" +
    " by " +
    '<a href="brand/' +
    fields.brand.sys.id +
    '">' +
    fields.brand.fields.companyName +
    "</a>" +
    "</div>"
  );
}

function renderImage(image, slug) {
  if (image && image.fields.file) {
    return (
      '<a href="Video/' +
      slug +
      '">' +
      '<img src="' +
      image.fields.file.url +
      '" width="150" height="150" />' +
      "</a>"
    );
  } else {
    return "";
  }
}

function renderVideo(video) {
  if (video) {
    return (
      '<video class="stock-videos" src="' +
      video.fields.file.url +
      '" width="100%">Your browser does not support the video tag.</video>' +
      "<h3>" +
      video.fields.title +
      "</h3>"
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("content-container");

  // Delegate mouseenter event
  container.addEventListener(
    "mouseenter",
    function (event) {
      if (event.target.tagName === "VIDEO") {
        event.target.controls = true;
      }
    },
    true
  ); // Using capture phase to ensure the video element gets the event

  // Delegate mouseleave event
  container.addEventListener(
    "mouseleave",
    function (event) {
      if (event.target.tagName === "VIDEO") {
        event.target.controls = false;
      }
    },
    true
  ); // Using capture phase to ensure the video element gets the event
});
