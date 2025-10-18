const images = [
  "images/image1.png",
  "images/image2.png",
  "images/image3.png"
];

let current = 0;

const carouselImage = document.getElementById("carousel-image");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

function showImage(index) {
  carouselImage.src = images[index];
}

nextBtn.addEventListener("click", () => {
  current = (current + 1) % images.length;
  showImage(current);
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
});
