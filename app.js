document.addEventListener('click', event => {

    const path = event.target
    console.log(path.getAttribute('name'))
})
