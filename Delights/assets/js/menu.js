const track = document.getElementById("image-track");
window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth/2;
  let percentage = (mouseDelta / maxDelta) * -100;
  let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
  nextPercentage = Math.max(-100, Math.min(0, nextPercentage)); // Ensure nextPercentage is between 0 and -100
  track.dataset.percentage = nextPercentage;
  track.animate({transform: `translate(${nextPercentage}%, -50%)`}, {duration:1200, fill:"forwards"});
  for(const image of track.getElementsByClassName("image")){
    image.animate({
      objectPosition :`${100 + nextPercentage}% 50%`},{
        duration: 1200, fill: "forwards"
      });
  }
}