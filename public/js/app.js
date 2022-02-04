
console.log('load js');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');



weatherForm.addEventListener('submit', (e) => {
    const location = search.value

    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:4000/weather?address=${location}`).then(
        (res) => {
            res.json().then(
                (data) => {
                    if (data.error) {
                        return messageOne.textContent = data.error
                    }
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            )
        }
    )
    e.preventDefault();
});



