document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/listar_agenda') // Endpoint para listar os eventos salvos
      .then(response => {
        if (!response.ok) {
          throw new Error('Não foi possível obter os eventos');
        }
        return response.json();
      })
      .then(data => {
        const eventsTableBody = document.getElementById('events-table-body');
  
        data.forEach(event => {
          // Criar uma nova linha na tabela
          const row = document.createElement('tr');
  
          // Adicionar células com os dados do evento
          const dateCell = document.createElement('td');
          dateCell.textContent = event.eventDate;
          row.appendChild(dateCell);
  
          const timeCell = document.createElement('td');
          timeCell.textContent = event.eventTime;
          row.appendChild(timeCell);
  
          const nameCell = document.createElement('td');
          nameCell.textContent = event.eventName;
          row.appendChild(nameCell);
  
          const descriptionCell = document.createElement('td');
          descriptionCell.textContent = event.eventDescription;
          row.appendChild(descriptionCell);
  
          // Criar uma célula para as ações (por exemplo, botão de excluir)
          const actionsCell = document.createElement('td');
          actionsCell.className = 'actionsCell';
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Excluir';
          deleteButton.className = 'bntdeleta'
          deleteButton.addEventListener('click', () => {
            // Ao clicar no botão "Excluir", enviar uma requisição DELETE para o servidor
            fetch(`http://localhost:3000/excluir_evento/${event.idEvents}`, {
              method: 'DELETE',
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro ao excluir evento');
              }
              // Remover a linha da tabela no front-end apenas se o usuário confirmar
             if (confirm('Tem certeza que deseja excluir este evento?')) {
                row.remove();
                alert('Evento excluído com sucesso');
             }
            })
            .catch(error => {
              console.error('Erro ao excluir evento:', error);
              alert('Erro ao excluir evento');
            });
          });
          actionsCell.appendChild(deleteButton);
          row.appendChild(actionsCell);
  
          // Adicionar a linha à tabela
          eventsTableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os eventos:', error);
        alert('Erro ao carregar os eventos');
      });
  });
  
  function novoRegistro(){
    const bntNovo = getElementById('bntNovo').value('Salvar'); 
    const bntAtualizar = getElementById('bntAtualiza').disabled;
    const bntDeleta = getElementById('bntDeleta').disabled;
    const bntRight = getElementById('bntRight').disabled;
    const bntLeft = getElementById('bntLeft').disabled;
 
    bntNovo.disabled = true
  }