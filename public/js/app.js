console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

weatherForm.addEventListener('submit', (e) => {

  p2.textContent = ''
  p1.textContent = 'Loading...'

  e.preventDefault()
  const location = search.value

  fetch('http://localhost:3000/weather?address='+location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        p1.textContent = 'Loading error'
        p2.textContent = data.error
        console.log(data.error)
      } else {
        p1.textContent = data.location
        p2.textContent = data.forecast
        console.log(data.location)
        console.log(data.forecast)
      }
    })
  })
})
