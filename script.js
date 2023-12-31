let circularProgressList = document.querySelectorAll(".circular-progress");


let options = {
  root: null,
  rootMargin: "0px",
  threshold: 1 
};


let handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCircularProgress(entry.target);
      observer.unobserve(entry.target); 
    }
  });
};


let observer = new IntersectionObserver(handleIntersection, options);


circularProgressList.forEach(circularProgress => {
  observer.observe(circularProgress);
});


function animateCircularProgress(circularProgress) {
  let progressStarValue = 0;
  let progressEndValue = parseInt(circularProgress.parentElement.getAttribute("data-percent"), 10) || 75;
  let speed = 30;

  let progress = setInterval(() => {
    progressStarValue++;
    circularProgress.querySelector(".progress-bar").textContent = `${progressStarValue}%`;

    circularProgress.style.background = `conic-gradient(#063f5f ${progressStarValue * 3.6}deg, #c8dadf 0deg)`;

    if (progressStarValue === progressEndValue) {
      clearInterval(progress);
    }

    console.log(progressStarValue);
  }, speed);
}


document.getElementById("descargar").addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "recurses/CurriculumBryanMartinez.pdf");
  xhr.responseType = "blob";
  xhr.onload = () => {
    const blob = xhr.response;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CV_Bryan_Martinez.pdf";
    a.click();
  };
  xhr.send();
});