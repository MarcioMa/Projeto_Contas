document.getElementById('event-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  
  fetch('http://localhost:3000/salvar_agenda', {
      method: 'POST',
      body: formData
  })
  
   .then(response => {
    if (!response.ok) {
        throw new Error('Erro ao salvar os dados');
    }
    return response.json();
    })

   .then(data => {
      console.log('Dados salvos com sucesso:', data);
      // Aqui você pode adicionar código para manipular o sucesso, como redirecionar para outra página
  })
  .catch(error => {
      console.error('Erro ao salvar os dados:', error);
      // Aqui você pode adicionar código para manipular o erro, como exibir uma mensagem de erro ao usuário
  });
});