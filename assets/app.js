const URL_API = 'https://restcountries.com/v2/all'

// fetch(URL_API).then(res => res.json()).then(data => console.log(data))

window.addEventListener('DOMContentLoaded', () => {

    const div_content_mode = document.getElementById('content_mode')
    const div_filter = document.querySelector('.content_select div')
    const options_select = document.querySelectorAll('#ul_select > li')

    div_content_mode.addEventListener('click',(e) => switchMode(e.target))
    div_filter.addEventListener('click', (e) => activeAccordion(div_filter))
    options_select.forEach(option => option.addEventListener('click', e  => addFilterSelect(e.target)))
})

function activeAccordion(element){
    if(element.classList.contains('accordion-none')){
        element.classList.remove('accordion-none')
        element.lastElementChild.classList.remove('d-none')
    }else{
        element.classList.add('accordion-none')
        element.lastElementChild.classList.add('d-none')
    }
}
function switchMode(element){
    const p_dark = document.getElementById('mode-dark')
    const p_light = document.getElementById('mode-light')

    if(element.id == 'mode-dark' ){
        p_light.classList.remove('active')
        p_dark.classList.add('active')
    }
    if(element.id == 'mode-light' ){
        p_dark.classList.remove('active')
        p_light.classList.add('active')
    }
}
function addFilterSelect(option){
    console.log(option.textContent)
}