import './style/style.scss';

const formOrder = document.querySelector('.order__form')
const inputName = document.querySelector('.order__input--name')
const images = document.querySelectorAll('.products__image')


const showMessage = (text) => {
    const message = document.createElement('P')
    message.style.fontSize = '32px'
    message.style.position = 'fixed'
    message.style.bottom = '0'
    message.style.right = '0'
    message.style.left = '0'
    message.style.padding = '100px'
    message.style.color = '#ffffff'
    message.style.backgroundColor = 'green'
    message.textContent = text
    document.querySelector('.order').appendChild(message)
    setTimeout(() => message.remove(), 2000)
}

//обработчик событий формы
formOrder.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: `${document.querySelector('.order__input--name').value}`,
        body: `${document.querySelector('.order__input--address').value}`,
        userId: `${document.querySelector('.order__input--number').value}`,
      }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .then(() => showMessage('Спасибо за заказ'))
    .catch((err) => showMessage(err))
})

//обработчик события инпута с именем
inputName.addEventListener('keydown', (evt) => {
    if (evt.key === '.') {
        evt.preventDefault()
    }
})

//обработчик событий закрытия popup
const popupHandler = () => {
    const popup = document.querySelector('.popup')
    popup.addEventListener('click', (evt) => {
        if (!evt.target.classList.contains('popup__image')) {
            popup.remove()
        }
    })
}

//открытие popup фотографий и клик на фотографии
const openPopupImage = () => {
    const arrImages = []

    for(let i = 0; i < images.length; i++) {
        arrImages.push(images[i].src)
        images[i].addEventListener('click', () => {
            const template = document.querySelector('.template-popup')
                .content
                .querySelector('.popup')
            const popup = template.cloneNode(true)
            popup.querySelector('.popup__image').src = images[i].src
            popup.querySelector('.popup__image').addEventListener('click', (evt) => {
                const index = arrImages.indexOf(evt.target.src)
                if (index + 1 == images.length) {
                    popup.querySelector('.popup__image').src = images[0].src
                } else {
                    popup.querySelector('.popup__image').src = images[index + 1].src
                }
            })
            document.querySelector('body').appendChild(popup)
            popupHandler()
        })
    }
    
}

openPopupImage()
