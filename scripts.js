document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".portfolio img");
  const lightbox = document.createElement("div");
  const lightboxImage = document.createElement("img");
  let currentImageIndex = 0;

  lightbox.id = "lightbox";
  lightbox.appendChild(lightboxImage);
  document.body.appendChild(lightbox);

  images.forEach((image, index) => {
    image.addEventListener("click", () => {
      currentImageIndex = index;
      lightbox.classList.add("active");
      lightboxImage.src = image.dataset.fullsize;
      lightboxImage.classList.add("active");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
    lightboxImage.classList.remove("active");
  });

  const nav = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > nav.offsetTop) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.classList.contains("active")) {
      if (event.key === "ArrowLeft") {
        changeImage(-1);
      } else if (event.key === "ArrowRight") {
        changeImage(1);
      }
    }
  });

  const hammer = new Hammer(lightboxImage);
  hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

  hammer.on("swipeleft", function () {
    if (lightbox.classList.contains("active")) {
      changeImage(1);
    }
  });

  hammer.on("swiperight", function () {
    if (lightbox.classList.contains("active")) {
      changeImage(-1);
    }
  });

  function changeImage(direction) {
    lightboxImage.classList.remove("active");
    lightboxImage.style.transform = `translate(-50%, -50%) translateX(${direction * -100}%)`;

    setTimeout(() => {
      currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
      lightboxImage.src = images[currentImageIndex].dataset.fullsize;
      lightboxImage.style.transform = `translate(-50%, -50%) translateX(${direction * -100}%)`;

      setTimeout(() => {
        lightboxImage.classList.add("active");
        lightboxImage.style.transform = "translate(-50%, -50%)";
      }, 50);
    }, 300);
  }
});
