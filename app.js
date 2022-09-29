const flagImage = document.getElementById('flagImage')
let activeFlag = {};
let countries = [];
let guessedFlags = [];

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const changeActiveFlag = (flags) => {
    activeFlag = flags[randomNumber(0, flags.length)]
    flagImage.src = activeFlag.flag
  }

fetch('countries.json')
    .then((response) => response.json())
    .then((json) => {
        countries = json
        changeActiveFlag(countries)
    });

document.addEventListener('click', event => {
    const path = event.target
    clickedName = path.getAttribute('name')
    
    if(clickedName == activeFlag.name) {
        countries = countries.filter(country => country.name != clickedName)
        path.setAttribute('fill', 'green')
        changeActiveFlag(countries)
    }
})
let d = 0
const showTime = () => {

    countries.length && d++
    document.getElementById("timer").innerHTML = new Date(d * 1000).toISOString().slice(11, 19);
}
setInterval(showTime, 1000);

showTime()



