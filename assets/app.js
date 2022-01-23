const URL_API = 'https://restcountries.com/v2/all'


window.addEventListener('DOMContentLoaded', () => {
    /* 
        Elements 
    */
    const div_content_mode = document.getElementById('content_mode')
    const div_filter = document.querySelector('.content_select div')
    const options_select = document.querySelectorAll('#ul_select > li')
    const div_countries = document.querySelector('section.content_countries')
    const input_countrie = document.getElementById('input_countrie')


    /* Data */
    let data = getDataLocalStorage() || {length: 0, data: []}
    
    /* 
        Events
    */
    /* Switch mode */
    div_content_mode.addEventListener('click', (e) => switchMode(e.target))
    /* "Select" filter by Region */
    div_filter.addEventListener('click', (e) => activeAccordion(div_filter))
    /* Filter by region */
    options_select.forEach(option => option.addEventListener('click', e => filterByRegion(e.target, options_select, data.data, div_countries)))
    /* Search by countrie */
    input_countrie.addEventListener('input', e => searchByCountrie(e.target.value, data.data, div_countries) )

    /* 
        Functionalities 
    */
    /* Focus to input search */
    focusInputSearch()

    /* 
        DATA - API 
    */
    if ( data.length == 0 ){
        // Find in API
        fetch(URL_API)
            .then(res => res.json())
            .then(info => {
                data = {
                    length: info.length,
                    data: info
                }
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
    
    /* Switch */
    const p_dark = document.getElementById('mode-dark')
    const p_light = document.getElementById('mode-light')
    const tag_body = document.querySelector('body')

    if (element.id == 'mode-dark') {
        p_light.classList.remove('active')
        p_dark.classList.add('active')
    }
    if (element.id == 'mode-light') {
        p_dark.classList.remove('active')
        p_light.classList.add('active')
    }

    // Dark mode
    setDarkMode(tag_body)

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
                <p><span>Capital:</span> ${(countrie.capital || "...")}</p>
            </div>
        </div>
    `
}

/* Filter by region */
function filterByRegion(option, options, data, div_content) {
    options.forEach( option => option.style.fontWeight = '300')
    option.style.fontWeight = "600"
    
    const region = option.getAttribute('data-key')
    const countries = data.filter( countrie => countrie.region == region)
    div_content.innerHTML = createHTMLCountries(countries)
}

/* Search by countrie */
function searchByCountrie(value, data, div_content){
    /* console.log(value) */
    const countries = data.filter( countrie => countrie.name.toLowerCase().includes(value))
    div_content.innerHTML = createHTMLCountries(countries)
}

/* Dark mode */
function setDarkMode(body){
    const tag_header = document.querySelector('header')
    const section_filters = document.querySelector('.content_filters')
    const section_content_countries = document.querySelector('.content_countries')

    if(body.classList.contains('dark-mode')){
        // Light mode
        body.classList.remove('dark-mode')
        tag_header.classList.remove('dark-mode')
        section_filters.classList.remove('dark-mode')
        section_content_countries.classList.remove('dark-mode')
    }else{
        // Dark mode
        body.classList.add('dark-mode')
        tag_header.classList.add('dark-mode')
        section_filters.classList.add('dark-mode')
        section_content_countries.classList.add('dark-mode')
    }

}