const formFee = document.querySelector('.formFees')
const alertForm = document.querySelector('.alert')
const firstPage = document.querySelector('.firstPage')
const secondPage = document.querySelector('.secondPage')
const divSecondPage = document.querySelector('.contentSecondPage')
const simulate = document.querySelector('.simulate')
const simulateAgain = document.querySelector('.simulateAgain')
const urlAPI = "https://api.mathjs.org/v4/"



formFee.addEventListener('submit', function(e){
    e.preventDefault()
    const name = e.target.name.value
    const monthlyPayment = e.target.monthlyPayment.value.toString().replace(",", ".")
    const time = e.target.time.value
    const fees = e.target.fees.value.toString().replace(",", ".").replace("%", "")

    
    if(name == null || name == ''){
        e.target.name.focus()
        alertForm.classList.remove('hidden')
    } else if(monthlyPayment == null || monthlyPayment == ''){
        e.target.monthlyPayment.focus()
        alertForm.classList.remove('hidden')
    } else if(time == null || time == ''){
        e.target.time.focus()
        alertForm.classList.remove('hidden')
    } else if(fees == null || fees == ''){
        e.target.fees.focus()
        alertForm.classList.remove('hidden')
    } else{
         apiFetch(name, monthlyPayment, time, fees)
    }

   
})

const apiFetch = (name, monthlyPayment, time, fees) => {
    const expr =  {
       expr: `${monthlyPayment} * (((1 + ${fees / 100}) ^ ${time * 12} - 1) / ${fees / 100})`,
       precision: 2,
    }

    fetch(urlAPI, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: [JSON.stringify(expr)]
    },)
        .then(response => response.json())
        .then(data => {
            firstPage.classList.add('hidden')
            secondPage.classList.remove('hidden')

            const currency = function(number){
                return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2}).format(number)
            }
            
            divSecondPage.innerHTML = `
                <span> Olá ${name}, juntando ${currency(monthlyPayment)} todos mês, você terá ${currency(data.result)} em ${time} anos</span>
            `
            simulateAgain.addEventListener('click', reloadPage)
        })
        .catch(response => {
            firstPage.classList.add('hidden')
            secondPage.classList.remove('hidden')
            divSecondPage.innerHTML = `
                <h3> Erro </h3>
                <span> Algo deu errado, tente novamente mais tarde!</span>
        
                <h5>Error = ${response}</h5>
            `
        
            simulateAgain.addEventListener('click', reloadPage)
        })
 
}

const reloadPage = () =>{
    location.reload()
}