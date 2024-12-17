const deleteById = async(e)=>{

  const id = e.id
  
  const res = await fetch(`http://localhost:3000/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({id})
  })
  
  if(res.ok){
    window.location.href = '/expenses'
  }
  
}

