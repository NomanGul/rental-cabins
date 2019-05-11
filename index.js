const constantNumbers = [1, 2, 3];

const cabinsObj = [
  {
    cabinName: "Granbo",
    images: constantNumbers.map(num => `granbo0${num}.jpg`),
    beds: 6,
    standard: "Average"
  },
  {
    cabinName: "Granstua",
    images: constantNumbers.map(num => `granstua0${num}.jpg`),
    beds: 4,
    standard: "High"
  }
];

const video = document.querySelector("#video");
const presentation = document.querySelector("#imagesPresentation");
const playButton = document.querySelector("#play_button");
const granbo = document.querySelector("#granboDiv");
const granstua = document.querySelector("#granstuaDiv");
let videoStartTime = 0;
let durationTime = 0;

video.addEventListener(
  "loadedmetadata",
  function() {
    videoStartTime = 0;
    durationTime = 20;
    this.currentTime = videoStartTime;
  },
  false
);

video.addEventListener("timeupdate", function() {
  if (this.currentTime > videoStartTime + durationTime) {
    this.pause();
    playButton.innerHTML = `Play`;
  }
});

playButton.addEventListener("click", function() {
  if (video.paused === true) {
    video.play();
    playButton.innerHTML = `Pause`;
    setTimeout(function() {
      presentation.innerHTML = "Select Cabin";
    }, 44000);
  } else {
    video.pause();
    playButton.innerHTML = `Play`;
  }
});

function changeCabin() {
  let imageIndex = 0;
  const cabinNumber = this.dataset.id;
  const sliderTemplate = `
  <h1>${cabinsObj[cabinNumber].cabinName}</h1>
  <p>${cabinsObj[cabinNumber].cabinName} cottage with ${
    cabinsObj[cabinNumber].beds
  } beds and ${cabinsObj[cabinNumber].standard} standard.</p>
  <img id="sliderImage" src="./assets/images/${
    cabinsObj[cabinNumber].images[imageIndex]
  }"><br>
  <input type="button" id="prev" value="<< Previous">
  <input type="button" id="next" value="Next >>">
  `;
  presentation.innerHTML = sliderTemplate;

  const image = document.querySelector("#sliderImage");
  const prevBtn = document.querySelector("#prev");
  const nextBtn = document.querySelector("#next");

  const goPrev = () => {
    imageIndex <= cabinsObj[cabinNumber].images.length - 1 &&
      imageIndex > 0 &&
      imageIndex--;
    image.src = `./assets/images/${cabinsObj[cabinNumber].images[imageIndex]}`;
  };

  const goNext = () => {
    imageIndex < cabinsObj[cabinNumber].images.length - 1 && imageIndex++;
    image.src = `./assets/images/${cabinsObj[cabinNumber].images[imageIndex]}`;
  };

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);
}

[granbo, granstua].map(element =>
  element.addEventListener("click", changeCabin)
);
