document.addEventListener('click', event => {

    const path = event.target
    console.log(path.getAttribute('name'))
})

const flagImage = document.getElementById('flagImage')

let countryNames = [];
let countryFlags = [];
let flags = [];

let countryData = fetch('https://restcountries.com/v3.1/region/europe')
    .then((response) => response.json())
    .then((data) => {
    const countries = data
    countries.forEach(e => {
            countryNames.push(e.name.common)
            flags.push({
                name: e.name.common,
                flag: e.flags.png
            })
            countryFlags.push(e.flags.png)

        });
        console.log(countryNames)
        console.log(countryFlags)
        console.log(flags)
        flagImage.src = flags[2].flag
        //console.log(countries)
    })


 // .then((response) => response.json())
  //.then((data) => console.log(data));
