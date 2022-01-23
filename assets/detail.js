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
    const btn_back = document.getElementById('btn_back')
    /* 
        Events 
    */
    div_content_mode.addEventListener('click', (e) => switchMode(e.target))
    btn_back.addEventListener('click', () => document.location.href = url_home)

   /* Theme */
   if(getTheme_LocalStorage() == 'dark-mode') switchMode({id: 'mode-dark'})
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
