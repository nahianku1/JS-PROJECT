let speedOptons = document.querySelector(".speedOptions");
let speedOptonsli = document.querySelectorAll(".speedOptions ul");
let play = document.querySelector(".fa-play");
let video = document.querySelector("video");
let speed = document.querySelector(".speed");
let miniplayer = document.querySelector(".miniplayer");
let fullscreen = document.querySelector(".fullscreen");
let container = document.querySelector(".container");
let progressbar = document.querySelector(".progress-bar");
let progressarea = document.querySelector(".progress-area");
let videoDuration = document.querySelector(".videoDuration");
let currentVidTime = document.querySelector(".currentVidTime");
let forwardbtn = document.querySelector(".fa-forward");
let backwardbtn = document.querySelector(".fa-backward");
let volumerange = document.querySelector(".volumerange");
let volumebtn = document.querySelector(".fa-volume-high");
let controls = document.querySelector(".controls");
let timer;

function hideControls() {
  if (video.paused) return;
  timer = setTimeout(() => {
    controls.classList.remove("show-controls");
  }, 3000);
}

hideControls();

controls.addEventListener("mousemove", (e) => {
  controls.classList.add("show-controls")
  clearTimeout(timer)
  hideControls()
});

const formatTime = (time) => {
  let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60),
    hours = Math.floor(time / 3600);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if (hours == 0) {
    return `00:${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

progressarea.addEventListener("click", (e) => {
  let timeline = progressarea.clientWidth;
  video.currentTime = (e.offsetX / timeline) * video.duration;
});

function draggableMove(e) {
  console.log(e.target);
  let timeline = progressarea.clientWidth;
  progressbar.style.width = `${e.offsetX}px`;
  video.currentTime = (e.offsetX / timeline) * video.duration;
}

speed.addEventListener("click", () => {
  speedOptons.classList.toggle("show");
});

video.addEventListener("play", () => {
  play.classList.replace("fa-play", "fa-pause");
  video.play();
});
video.addEventListener("pause", () => {
  play.classList.replace("fa-pause", "fa-play");
  video.pause();
});

play.addEventListener("click", () => {
  video.paused ? video.play() : video.pause();
});

video.addEventListener("click", (e) => {
  video.paused ? video.play() : video.pause();
});

video.addEventListener("touchstart", (e) => {
  console.log(e);
});
document.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    video.paused ? video.play() : video.pause();
  } else if (e.key == "ArrowRight") {
    video.currentTime += 5;
  } else if (e.key == "ArrowLeft") {
    video.currentTime -= 5;
  }
});

miniplayer.addEventListener("click", () => {
  video.requestPictureInPicture();
});

fullscreen.addEventListener("click", () => {
  if (document.fullscreenElement) {
    fullscreen.classList.replace("fa-compress", "fa-expand");
    document.exitFullscreen();
    return;
  }
  fullscreen.classList.replace("fa-expand", "fa-compress");
  container.requestFullscreen();
});

video.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;
  let percent = (currentTime / duration) * 100;
  progressbar.style.width = `${percent}%`;
  currentVidTime.innerText = formatTime(currentTime);
});

video.addEventListener("loadeddata", () => {
  videoDuration.innerText = formatTime(video.duration);
});

speedOptons.querySelectorAll("ul").forEach((option) => {
  option.addEventListener("click", () => {
    video.playbackRate = option.dataset.speed;
    speedOptons.querySelectorAll("ul.active")[0].classList.remove("active");
    option.classList.add("active");
    speedOptons.classList.remove("show");
  });
});

progressarea.addEventListener("pointerdown", () => {
  progressarea.addEventListener("pointermove", draggableMove);
});

document.addEventListener("pointerup", (e) => {
  progressarea.removeEventListener("pointermove", draggableMove);
});

forwardbtn.addEventListener("click", (e) => {
  video.currentTime += 5;
});
backwardbtn.addEventListener("click", (e) => {
  video.currentTime -= 5;
});

volumerange.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.volume == 0
    ? volumebtn.classList.replace("fa-volume-high", "fa-volume-xmark")
    : volumebtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

volumebtn.addEventListener("click", (e) => {
  if (volumebtn.classList.contains("fa-volume-high")) {
    volumebtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    video.volume = 0.0;
  } else {
    video.volume = 1.0;
    volumebtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  }
});
