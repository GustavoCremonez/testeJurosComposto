const formFee = document.querySelector('.formFees')
const firstPage = document.querySelector('.firstPage')
const secondPage = document.querySelector('.secondPage')
const divSecondPage = document.querySelector('.contentSecondPage')
const simulate = document.querySelector('.simulate')
const simulateAgain = document.querySelector('.simulateAgain')
const urlAPI = "http://api.mathjs.org/v4/"



formFee.addEventListener('submit', function(e){
    e.preventDefault()
    const target = e.target
    const name = target.name.value
    const monthlyPayment = target.monthlyPayment.value
    const time = target.time.value
    const fees = target.fees.value.toString().replace(",", ".")


    apiFetch(name, monthlyPayment, time, fees)
})

const apiFetch = (name, monthlyPayment, time, fees) => {
    const expr = { 
        "expr" : [`${monthlyPayment} * (((1 + ${fees}) ^ [${time * 12} - 1) / ${fees})`],
        "precision": 3
    }

    const init = {
        method: 'POST',
        headers: {
            "content-type": 'application/json'
        },
        body: encodeURI(expr)
    }
    fetch(urlAPI, init)
        .then(toJson)
        .then(makeHtmlElement)
        .catch(apiErr)
}

const toJson = (response) =>{
    return response.json()
}

const makeHtmlElement = function(data){
    console.log(data)
}

const apiErr = (response) => {
    firstPage.classList.add('hidden')
    secondPage.classList.remove('hidden')
    divSecondPage.innerHTML = `
        <h3> Erro </h3>
        <span> Algo deu errado, tente novamente mais tarde!</span>

        <h5>Error = ${response}</h5>
    `

    simulateAgain.addEventListener('click', function(e){
        location.reload()
    })
}
