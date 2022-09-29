import { randomNumber, confettiFire, getTimeStamp } from './helper.js'

const flagImage = document.getElementById('flagImage')
const countryName = document.getElementById('countryName')
const timer = document.getElementById("timer")
const startButton = document.getElementById('startGame')

let activeFlag = {};
let countries = [];
const audio = new Audio();
let duration = 0
let gameActive = false

timer.innerHTML = getTimeStamp(duration)

fetch('countries.json')
    .then((response) => response.json())
    .then((json) => {
        countries = json     
    });

startButton.onclick = (() => {
  if(!gameActive){
    startButton.innerHTML = 'Game started'
    gameActive = true
    changeActiveFlag(countries)
  }
})

const changeActiveFlag = (flags) => {
  activeFlag = flags[randomNumber(0, flags.length)]

  flagImage.src = activeFlag.flag
  countryName.innerHTML = activeFlag.name
  audio.src = `./assets/songs/${activeFlag.name}.mp3`
  audio.play()
}
    
document.addEventListener('click', event => {
    const path = event.target
    const clickedName = path.getAttribute('name');

    if(clickedName == activeFlag.name) {
        countries = countries.filter(country => country.name != clickedName)

        countries.length ? changeActiveFlag(countries) : confettiFire()

        path.setAttribute('fill', 'green')

    }
})


const gameTimer = () => {
    (countries.length && gameActive) && duration++
    timer.innerHTML = getTimeStamp(duration)
}

setInterval(gameTimer, 1000);

