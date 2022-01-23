const URL_API = 'https://restcountries.com/v2/all'

if (!localStorage.getItem('url_index')) {
    localStorage.setItem('url_index', document.location.href)
}


window.addEventListener('DOMContentLoaded', () => {
    /* 
        Elements 
    */
    const div_content_mode = document.getElementById('content_mode')
    const div_filter = document.querySelector('.content_select div')
    const options_select = document.querySelectorAll('#ul_select > li')
    const div_countries = document.querySelector('section.content_countries')
    const input_countrie = document.getElementById('input_countrie')

    /* Theme */
    if (getTheme_LocalStorage() == 'dark-mode') switchMode({ id: 'mode-dark' })

    /* Data */
    let data = getDataLocalStorage() || { length: 0, data: [] }
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
    input_countrie.addEventListener('input', e => searchByCountrie(e.target.value, data.data, div_countries))

    /* 
        Functionalities 
    */
    /* Focus to input search */
    focusInputSearch()

    /* 
        DATA - API 
    */
    if (data.length == 0) {
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
    } else {
        // Add countries to DOM
        div_countries.innerHTML = createHTMLCountries(data.data)
    }

})

/* 
    HOME
*/
function activeAccordion(element) {
    if (element.classList.contains('accordion-none')) {
        element.classList.remove('accordion-none')
        element.lastElementChild.classList.remove('d-none')
    } else {
        element.classList.add('accordion-none')
        element.lastElementChild.classList.add('d-none')
    }
}
/* Switch mode */
function switchMode(elementClick) {
    const dark_mode = document.getElementById('mode-dark')
    const light_mode = document.getElementById('mode-light')

    /* Switch */
    if (elementClick.id === 'mode-dark') {
        dark_mode.classList.add('active')
        light_mode.classList.remove('active')
    } else {
        dark_mode.classList.remove('active')
        light_mode.classList.add('active')
    }

    // Dark mode
    setDarkMode(document.querySelector('body'))
}
/* Dark mode */
function setDarkMode(body) {
    const tag_header = document.querySelector('header')
    const section_filters = document.querySelector('.content_filters')
    const section_content_countries = document.querySelector('.content_countries')
    
    /* Update view and theme in localstorage */
    if (body.classList.contains('dark-mode')) {
        saveTheme_localStorage(null) // update To light mode
        body.classList.remove('dark-mode')
        tag_header.classList.remove('dark-mode')
        section_filters.classList.remove('dark-mode')
        section_content_countries.classList.remove('dark-mode')
    } else {
        saveTheme_localStorage('dark-mode') // update To dark mode
        body.classList.add('dark-mode')
        tag_header.classList.add('dark-mode')
        section_filters.classList.add('dark-mode')
        section_content_countries.classList.add('dark-mode')
    }
}
function focusInputSearch() {
    const input = document.getElementById('input_countrie')
    const contentSearch = document.querySelector('section.content_filters .content_search')

    contentSearch.addEventListener('click', () => input.focus())

}
/* Save theme localstorage */
function saveTheme_localStorage(theme_color) {
    localStorage.setItem('theme', theme_color)
}
/* Get theme localstorage */
function getTheme_LocalStorage() {
    return localStorage.getItem('theme') || null
}
/* Save data in localstorage */
function saveLocalStorage(data) {
    const dataObject = {
        length: data.length,
        data
    }
    localStorage.setItem('data', JSON.stringify(dataObject))
}
/* Get data to localstorage */
function getDataLocalStorage() {
    return JSON.parse(localStorage.getItem('data'))
}
/* HTML Countries */
function createHTMLCountries(countries) {
    let htmlCountries = ''

    countries.forEach(countrie => {
        htmlCountries += createCardCountrie(countrie)
    })

    return htmlCountries
}
/* Create Card */
function createCardCountrie(countrie) {
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
    options.forEach(option => option.style.fontWeight = '300')
    option.style.fontWeight = "600"

    const region = option.getAttribute('data-key')
    const countries = data.filter(countrie => countrie.region == region)
    div_content.innerHTML = createHTMLCountries(countries)
}
/* Search by countrie */
function searchByCountrie(value, data, div_content) {
    /* console.log(value) */
    const countries = data.filter(countrie => countrie.name.toLowerCase().includes(value))
    div_content.innerHTML = createHTMLCountries(countries)
}
