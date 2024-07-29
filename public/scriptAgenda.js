document.getElementById('event-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Previne o envio padrão do formulário

  const formData = {
    eventName: document.getElementById('eventName').value,
    eventDate: document.getElementById('eventDate').value,
    eventTime: document.getElementById('eventTime').value,
    eventDescription: document.getElementById('eventDescription').value
};

fetch('/salvar_agenda', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        window.location.href="./index.html";
        alert('Evento salvo com sucesso!');
    } else {
        alert('Falha ao salvar o evento.');
    }
})
.catch(error => {
    console.error('Erro:', error);
    alert('Erro ao salvar o evento.');
});
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/lista') // Endpoint para listar os eventos salvos
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
          const idCell = document.createElement('td');
          idCell.textContent = event.idEvents;
          row.appendChild(idCell);

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
            if (confirm('Tem certeza que deseja excluir este evento?')) {
              fetch(`http://localhost:3000/excluir/${event.idEvents}`, {
                method: 'DELETE',
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Erro ao excluir evento');
                  console.log(event.idEvents);
                }
                // Remover a linha da tabela apenas se a exclusão for bem-sucedida
                row.remove();
                alert('Evento excluído com sucesso');
              })
              .catch(error => {
                console.error('Erro ao excluir evento:', error);
                alert('Erro ao excluir evento');
              });
            }
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