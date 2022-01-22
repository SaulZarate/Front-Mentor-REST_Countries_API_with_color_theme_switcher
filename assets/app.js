const URL_API = 'https://restcountries.com/v2/all'

// fetch(URL_API).then(res => res.json()).then(data => console.log(data))

window.addEventListener('DOMContentLoaded', () => {

    const div_content_mode = document.getElementById('content_mode')
    const div_filter = document.querySelector('.content_select div')
    const options_select = document.querySelectorAll('#ul_select > li')
    const div_countries = document.querySelector('section.content_countries')

    div_content_mode.addEventListener('click', (e) => switchMode(e.target))
    div_filter.addEventListener('click', (e) => activeAccordion(div_filter))
    options_select.forEach(option => option.addEventListener('click', e => addFilterSelect(e.target)))
    focusInputSearch()


    /* DATA - API */
    let data = getDataLocalStorage()
    if (data == null ){
        // Find in API
        fetch(URL_API)
            .then(res => res.json())
            .then(info => {
                console.log(info)
                // Save
                saveLocalStorage(info)
                // Add countries to DOM
                div_countries.innerHTML = createHTMLCountries(info)
            })
            .catch(err => {
                console.log(err)
            })
        }else{
            // Add countries to DOM
            div_countries.innerHTML = createHTMLCountries(data.data)
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
function focusInputSearch(){
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


/* HTML Countries */
function createHTMLCountries(countries){
    let htmlCountries = ''

    countries.forEach( countrie => {
        htmlCountries += createCardCountrie(countrie)
    })

    return htmlCountries
}
/* Create Card */
function createCardCountrie(countrie){
    return `
    <div class="card">
            <div class="content_image">
                <img src="${countrie.flags.png}" alt="${countrie.name}">
            </div>
            <div class="content_text">
                <h2>${countrie.name}</h2>
                <p><span>Population:</span> ${countrie.population}</p>
                <p><span>Region:</span> ${countrie.region}</p>
                <p><span>Capital:</span> ${countrie.capital}</p>
            </div>
        </div>
    `
}