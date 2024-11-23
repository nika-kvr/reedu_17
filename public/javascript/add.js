const form = document.querySelector('form')

form.addEventListener('submit', async(e)=>{
  e.preventDefault()

  const category = form.category.value
  const price = form.price.value
  
  const res = await fetch('http://localhost:3000/expenses/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({category, price })
  })
  
  if(res.ok){
    window.location.href = '/expenses'
  }
  
})