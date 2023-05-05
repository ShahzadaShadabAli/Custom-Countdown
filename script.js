const container = document.getElementById('container');
const dateEl = document.getElementById('set-date');
const countdownForm = document.getElementById('countdownForm');

const countdownEl = document.getElementById('countdown')
const countdownTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-btn')
const countdownSpans = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeInfo = document.getElementById('countdown-info')
const completeBtn = document.getElementById('complete-btn')

let titleInput = '' 
let setDateInput = ''
let setDateValue = Date //It is the date that will be converted to ms
let countdownActive
let storedCountdown

//Updating the values and Complete UI
function updateValue(){
  
    countdownActive = setInterval(function(){
        const now = new Date().getTime() // From 1970 till now
        const distance = setDateValue - now 
        //Atomizing Out The Hours Minutes etc From ms
        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)
        if(distance < 0){
            completeEl.hidden = false
            countdownForm.hidden = true
            countdownEl.hidden = true
            completeInfo.textContent = `${titleInput} completed on ${setDateInput}`
            clearInterval(countdownActive)
        } else{
        countdownForm.hidden = true
        countdownEl.hidden = false
        //Populating the count down values
        countdownTitle.textContent = `${titleInput}`
        countdownSpans[0].textContent = `${days}`
        countdownSpans[1].textContent = `${hours}`
        countdownSpans[2].textContent = `${minutes}`
        countdownSpans[3].textContent = `${seconds}`   
        }
 
    }, second)
  
}

const second = 1000
const  minute = second * 60
const hour = minute * 60
const day = hour * 24

//Getting The Info Out Of The Form
function updateForm(e){
    e.preventDefault()
    titleInput = e.srcElement[0].value
    setDateInput = e.srcElement[1].value
    storedCountdown = {
        title: titleInput,
        date: setDateInput,
    }
    setDateValue = new Date(setDateInput).getTime() //From 1970 till timer date
    updateValue();

    localStorage.setItem('countdown', JSON.stringify(storedCountdown))
}

function reset(){
    countdownEl.hidden = true
    completeEl.hidden = true
    countdownForm.hidden = false
    clearInterval(countdownActive)
    setDateInput = ''
    titleInput = ''
    localStorage.removeItem('countdown')
}

function getInfoOutOfLS(){
    if(localStorage.getItem('countdown')){
        storedCountdown = JSON.parse(localStorage.getItem('countdown'))
        titleInput = storedCountdown.title
        setDateInput = storedCountdown.date
        setDateValue = new Date(setDateInput).getTime()
        updateValue();
    }
}

//Minimun Date set
let today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today)

//Event Listeners
countdownForm.addEventListener('submit', updateForm)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

//on load
getInfoOutOfLS();