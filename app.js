document.addEventListener('click', event => {

    const path = event.target
    console.log(path.getAttribute('name'))
})
fetch('https://restcountries.com/v3.1/region/europe')
    .then((response) => console.log(response.json()))
    
 // .then((response) => response.json())
  //.then((data) => console.log(data));
