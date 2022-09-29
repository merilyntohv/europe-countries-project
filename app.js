
const flagImage = document.getElementById('flagImage')
const countryName = document.getElementById('countryName')
let activeFlag = {};
let countries = [];
let guessedFlags = [];
function confettiFire() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const changeActiveFlag = (flags) => {
    activeFlag = flags[randomNumber(0, flags.length)]

    flagImage.src = activeFlag.flag
    countryName.innerHTML = activeFlag.name
  }

fetch('countries.json')
    .then((response) => response.json())
    .then((json) => {
        countries = json
        changeActiveFlag(countries)
    });

document.addEventListener('click', event => {
    const path = event.target
    clickedName = path.getAttribute('name');

    if(clickedName == activeFlag.name) {
        countries = countries.filter(country => country.name != clickedName)
        if (!countries.length) {
            confettiFire()
        } else {

            changeActiveFlag(countries)
            const audio = new Audio();
            audio.src = `./assets/songs/${clickedName}.mp3`
            audio.play()
        }
        path.setAttribute('fill', 'green')

    }
})
let d = 0
const showTime = () => {

    countries.length && d++
    document.getElementById("timer").innerHTML = new Date(d * 1000).toISOString().slice(11, 19);
}
setInterval(showTime, 1000);

showTime()
