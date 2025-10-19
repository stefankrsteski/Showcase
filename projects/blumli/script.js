const images = [
  "images/blumli-1.png",
  "images/blumli-2.png",
  "images/blumli-3.png",
  "images/blumli-4.png"
];

let current = 0;
const container = document.querySelector(".phone-container");
const img1 = container.querySelector(".img1");
const img2 = container.querySelector(".img2");
let topImg = img1;
let bottomImg = img2;

topImg.src = images[current];
topImg.classList.add("active");

let startX = 0;

// Show image with crossfade
function showImage(nextIndex) {
  bottomImg.src = images[nextIndex];
  bottomImg.classList.add("active");
  topImg.classList.remove("active");

  // swap top/bottom
  [topImg, bottomImg] = [bottomImg, topImg];
  current = nextIndex;
}

// Swipe logic (mouse)
container.addEventListener("mousedown", e => startX = e.clientX);
container.addEventListener("mouseup", e => {
  const diff = e.clientX - startX;
  if (diff > 50) showImage((current - 1 + images.length) % images.length);
  if (diff < -50) showImage((current + 1) % images.length);
});

// Swipe logic (touch)
container.addEventListener("touchstart", e => startX = e.touches[0].clientX);
container.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) showImage((current - 1 + images.length) % images.length);
  if (diff < -50) showImage((current + 1) % images.length);
});
