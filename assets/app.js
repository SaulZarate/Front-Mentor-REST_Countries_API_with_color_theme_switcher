const URL_API = 'https://restcountries.com/v2/all'

// fetch(URL_API).then(res => res.json()).then(data => console.log(data))

window.addEventListener('DOMContentLoaded', () => {

    const div_content_mode = document.getElementById('content_mode')
    const div_filter = document.querySelector('.content_select div')
    const options_select = document.querySelectorAll('#ul_select > li')

    div_content_mode.addEventListener('click', (e) => switchMode(e.target))
    div_filter.addEventListener('click', (e) => activeAccordion(div_filter))
    options_select.forEach(option => option.addEventListener('click', e => addFilterSelect(e.target)))
    /* Div to Input */
    divToInput()


    /* DATA - API */
    let data = getDataLocalStorage()

    if (data == null ){
        // Find in API
        fetch(URL_API)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // save
                saveLocalStorage(data)

            })
            .catch(err => {
                console.log(err)
            })
    }else{
        console.log(getDataLocalStorage())
    }


})

function activeAccordion(element) {
    if (element.classList.contains('accordion-none')) {
        element.classList.remove('accordion-none')
        element.lastElementChild.classList.remove('d-none')
    } else {
        element.classList.add('accordion-none')
        element.lastElementChild.classList.add('d-none')
    }
}
function switchMode(element) {
    const p_dark = document.getElementById('mode-dark')
    const p_light = document.getElementById('mode-light')

    if (element.id == 'mode-dark') {
        p_light.classList.remove('active')
        p_dark.classList.add('active')
    }
    if (element.id == 'mode-light') {
        p_dark.classList.remove('active')
        p_light.classList.add('active')
    }
}
function addFilterSelect(option) {
    console.log(option.textContent)
}
function divToInput(){
    const input = document.getElementById('input_countrie')
    const contentSearch = document.querySelector('section.content_filters .content_search')
    
    contentSearch.addEventListener('click', () => input.focus())
    
}


/* DATA */
function saveLocalStorage(data) {
    const dataObject = {
        length: data.length,
        data
    }
    localStorage.setItem('data', JSON.stringify(dataObject))
}
function getDataLocalStorage() {
    return JSON.parse(localStorage.getItem('data'))
}