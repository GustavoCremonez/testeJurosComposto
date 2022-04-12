const formFee = document.querySelector('.formFees')
const simulate = document.querySelector('.simulate')
const simulateAgain = document.querySelector('.simulateAgain')
const urlAPI = api.mathjs.org/v4/



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
    const expr = { "expr" : `${monthlyPayment} * (((1 + ${fees}) ^ [${time * 12} - 1) / ${fees}) `}

    console.log(JSON.stringify(expr))
}