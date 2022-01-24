const url_home = localStorage.getItem('url_index')
const countrie_id = getIdCountrieByGET()
const data = getDataLocalStorage()
const countrie = findCountrie(countrie_id, data.data)

// Middleware url
if(countrie_id == null || !countrie){
    window.location.href = localStorage.getItem('url_index')
}

console.log(countrie)
window.addEventListener('DOMContentLoaded', () =>{

    /* 
        Elements 
    */
    const div_content_mode = document.getElementById('content_mode')
    const div_content_detail = document.querySelector('.content_detail')

    /* 
        Events 
    */
    div_content_mode.addEventListener('click', (e) => switchMode(e.target))

   /* Theme */
   if(getTheme_LocalStorage() == 'dark-mode') switchMode({id: 'mode-dark'})

   /* Add data */
    div_content_detail.innerHTML = createHTMLDetail(countrie)
})

/* Id countrie */
function getIdCountrieByGET() {
    const urlCurrent = document.location.href
    if(!urlCurrent.includes('?countrie=')) return null
    const positionId = urlCurrent.indexOf("=") + 1
    const id = urlCurrent.substring(positionId)
    return parseInt(id)
}
/* Validation id */
function findCountrie(id, countries){
    return countries.find(c => c.numericCode == id) || false
}
/* Switch mode */
function switchMode(elementClick) {
    const dark_mode = document.getElementById('mode-dark')
    const light_mode = document.getElementById('mode-light')

    /* Switch */
    if(elementClick.id === 'mode-dark'){
        dark_mode.classList.add('active')
        light_mode.classList.remove('active')
    }else{
        dark_mode.classList.remove('active')
        light_mode.classList.add('active')
    }
    // Dark mode
    setDarkMode(document.querySelector('body'))
}
/* Dark mode */
function setDarkMode(body) {
    const tag_header = document.querySelector('header')

    /* Update view and theme in localstorage */
    if (body.classList.contains('dark-mode')) {
        saveTheme_localStorage(null) // update To light mode
        body.classList.remove('dark-mode')
        tag_header.classList.remove('dark-mode')
    } else {
        saveTheme_localStorage('dark-mode') // update To dark mode
        body.classList.add('dark-mode')
        tag_header.classList.add('dark-mode')
    }
}
/* Save theme localstorage */
function saveTheme_localStorage(theme_color){
    localStorage.setItem('theme',theme_color)
}
/* Get theme localstorage */
function getTheme_LocalStorage(){
    return localStorage.getItem('theme') == 'dark-mode' ? 'dark-mode' : null
}
/* Get data to localstorage */
function getDataLocalStorage() {
    return JSON.parse(localStorage.getItem('data'))
}
/* Create HTML detil */
function createHTMLDetail(countrie){
    const reduceNames = (previus, currentValue) => previus.concat(currentValue.name)
    const topLevelDomain = countrie.topLevelDomain.join()
    const currencies = countrie.currencies.reduce(reduceNames,[]).join()
    const languages = countrie.languages.reduce(reduceNames,[]).join()
    const borderCountries = getBorderCountries(countrie)
    
    return `
    <!-- Image -->
    <div class="content_image">
        <img src="${countrie.flags.png}" alt="${countrie.name}">
    </div>

    <!-- Text -->
    <div class="content_text">
        <div class="content_text__header">
            <h1>${countrie.name}</h1>
        </div>
        <div class="content_text__body">
            <div class="body_left">
                <p><span>Native Name: </span>${countrie.nativeName}</p>
                <p><span>Population: </span>${countrie.population}</p>
                <p><span>Region: </span>${countrie.region}</p>
                <p><span>Sub region: </span>${countrie.subregion}</p>
                <p><span>Capital: </span>${countrie.capital}</p>
            </div>
            <div class="body_right">
                <p><span>Top Level Domain: </span>${topLevelDomain}</p>
                <p><span>Currencies: </span>${currencies}</p>
                <p><span>Languages: </span>${languages}</p>
            </div>
        </div>
        <div class="content_text__footer">
            <h2>Border Countries:</h2>
            <div class="content_buttons">
                ${createButtonBorderCountrie(borderCountries)}
            </div>
        </div>
    </div>
    `
}
function createButtonBorderCountrie(borderCountries){
    let htmlButtons = ''
    borderCountries.forEach(countrie => {
        htmlButtons += `
        <button>${countrie.name}</button>
        `
    })
    return htmlButtons
}
function getBorderCountries(countrie){
    const alpha3Codes = countrie.borders
    return data.data.filter(countrie => alpha3Codes.includes(countrie.alpha3Code))
}
/* function isStringInArray(str, array){
    
} */