//Formata Moeda BR
function formatarValor(valor) {
    const valorFormatado = Number(valor).toFixed(2); 
    return valorFormatado.toLocaleString('pt-BR'); 
}

//formata data para padrão BR
function formatarData(data) {
    if (!data || typeof data !== 'string') {
        return data; // Retorna a data original se não for uma string válida
    }

    const dataISO = new Date(data);
    if (isNaN(dataISO.getTime())) {
        return data; // Retorna a data original se não for uma data válida
    }

    const dia = dataISO.getUTCDate().toString().padStart(2, '0');
    const mes = (dataISO.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = dataISO.getUTCFullYear();

    return `${dia}/${mes}/${ano}`;
}

document.getElementById('selRelatorio').addEventListener('change', carregaRelatorio);

function carregaRelatorio() {
    if (document.getElementById('selRelatorio').value === "Agenda") { 
        document.getElementById('events-table').style.display = "table";
        document.getElementById('cads-table').style.display = "none";
        document.getElementById('TitleH3').innerText = "Relatório Agendas"; 


        //Busca dados na tabela DB
            fetch('http://localhost:3000/lista') // Endpoint para listar os eventos salvos
              .then(response => {
                if (!response.ok) {
                  throw new Error('Não foi possível obter os eventos');
                }
                return response.json();
              })
              .then(data => {
                const eventsTableBody = document.getElementById('events-table-body');

                //limpeza dados da tabela
                eventsTableBody.innerHTML = '';

                data.forEach(event => {
                  // Criar uma nova linha na tabela
                  const row = document.createElement('tr');
          
                  // Adicionar células com os dados do evento
                  const idCell = document.createElement('td');
                  idCell.textContent = event.idEvents;
                  row.appendChild(idCell);
        
                  const dateCell = document.createElement('td');
                  dateCell.textContent = formatarData(event.eventDate);
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
                  // Adicionar a linha à tabela
                  eventsTableBody.appendChild(row);
                });
              })
              .catch(error => {
                console.error('Erro ao carregar os eventos:', error);
                alert('Erro ao carregar os eventos');
              });

    } else {

        document.getElementById('cads-table').style.display = "table";
        document.getElementById('events-table').style.display = "none";
        document.getElementById('TitleH3').innerText = "Relatório Cadastros";

        //Busca dados na tabela Contas DB
        fetch('http://localhost:3000/listaContas') // Endpoint para listar os eventos salvos
        .then(response => {
          if (!response.ok) {
            throw new Error('Não foi possível obter os eventos');
          }
          return response.json();
        })
        .then(data => {
          const cadTableBody = document.getElementById('cad-table-body');

          //limpeza dados da tabela
          cadTableBody.innerHTML = '';

          data.forEach(conta => {
            // Criar uma nova linha na tabela
            const row = document.createElement('tr');
    
            // Adicionar células com os dados do evento
            const idCell = document.createElement('td');
            idCell.textContent = conta.idContas;
            row.appendChild(idCell);
  
            const nmConta = document.createElement('td');
            nmConta.textContent = formatarData(conta.nomeConta);
            row.appendChild(nmConta);
    
            const dtEmissao = document.createElement('td');
            dtEmissao.textContent = formatarData(conta.dataEmissao);
            row.appendChild(dtEmissao);
    
            const  valorCell = document.createElement('td');
            valorCell.textContent = "R$ " + formatarValor(conta.valor);
            row.appendChild(valorCell);
    
            const  vencCell = document.createElement('td');
            vencCell.textContent = formatarData(conta.vencimento);
            row.appendChild(vencCell);

            const  statusCell = document.createElement('td');
            statusCell.textContent = conta.status;
            row.appendChild(statusCell);

            // Adicionar a linha à tabela
            cadTableBody.appendChild(row);
          });
        })
        .catch(error => {
          console.error('Erro ao carregar os eventos:', error);
          alert('Erro ao carregar os eventos');
        });
    }
}
