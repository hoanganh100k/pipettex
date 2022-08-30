/* equity-utils.js | https://www.indonez.com | Zainal Mudzakir | MIT License */
if(document.querySelector('.in-equity-12') !== null) {
    const stepsEl = document.querySelectorAll('.in-steps')

    stepsEl[0].classList.add('active-step')
    stepsEl.forEach(el => {
        el.addEventListener('mouseover', () => {
            stepsEl[0].classList.remove('active-step')
            el.classList.add('active-step')
        })
        el.addEventListener('mouseout', () => {
            el.classList.remove('active-step')
            stepsEl[0].classList.add('active-step')
        })
    })
}