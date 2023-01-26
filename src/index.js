import './style/style.scss';

const formOrder = document.querySelector('.order__form')
const inputName = document.querySelector('.order__input--name')
const images = document.querySelectorAll('.products__image')


//обработчик событий формы
formOrder.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target)
    console.log(formData)
})

//обработчик события инпута с именем
inputName.addEventListener('keydown', (evt) => {
    if (evt.key === '.') {
        evt.preventDefault()
    }
})
const arrImages = [...images]
for (let i = 0; i < arrImages; i++) {
    arrImages[i].addEventListener('click', () => {
        console.log('here')
        const template = document.querySelector('.template-popup')
            .content
            .querySelector('.popup')
        const popup = template.cloneNode(true)
        popup.querySelector('.popup__image').src = arrImages[i].src
        console.log(arrImages[i].src)
        document.querySelector('body').appendChild(popup)
    })
}
console.log(arrImages)

images.forEach((image) => {
    image.addEventListener('click', (evt) => {
        const template = document.querySelector('.template-popup')
            .content
            .querySelector('.popup')
        const popup = template.cloneNode(true)
        popup.querySelector('.popup__image').src = evt.target.src
        document.querySelector('body').appendChild(popup)
    })
})