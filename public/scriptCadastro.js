const formCadastro = document.getElementById('formCadastro');
const idConta = document.getElementById('id');
const bntNovo = document.getElementById('bntNovo');
const bntSave = document.getElementById('bntSave');
const bntAtualizar = document.getElementById('bntAtualiza');
const bntDeleta = document.getElementById('bntDeleta');
const bntRight = document.getElementById('bntRight');
const bntLeft = document.getElementById('bntLeft');
const fieldset = document.getElementById('fldSet');
const nomeConta = document.getElementById('nomeConta');
const dataEmissao = document.getElementById('dataEmissao');
const valor = document.getElementById('valor');
const vencimento = document.getElementById('vencimento');
const status = document.getElementById('status');
var update = false; 
const reg = 0;


function clickNovoReg(){
  if(bntNovo.value === 'Novo') {
    fieldset.disabled = false;  
    bntNovo.value = 'Cancelar';
    bntSave.disabled = false;
    bntAtualizar.disabled = true;
    bntExcluir.disabled = true;
    bntRight.disabled = true;
    bntLeft.disabled = true;
  }else{
    bntNovo.value = 'Novo';
    bntSave.disabled = true;
    fieldset.disabled = true; 
    bntAtualizar.disabled = false;
    bntAtualizar.value = 'Atualizar'
    bntExcluir.disabled = false;
    bntRight.disabled = false;
    bntLeft.disabled = false;
    formCadastro.reset();
    update = false;
  } 
}

function clickAtualizarReg(){
  if(bntAtualizar.value === 'Atualizar') {
    fieldset.disabled = false;  
    bntNovo.value = 'Cancelar';
    bntSave.disabled = false;
    bntAtualizar.disabled = true;
    bntExcluir.disabled = true;
    bntRight.disabled = true;
    bntLeft.disabled = true;
    update = true;
  } 
}

function clickSaveReg(){
  if(nomeConta.value == "" && dataEmissao.value == "" && valor.value == "" && vencimento.value == "") {
    alert("Informe todos dados para salvar!");
  }
  if(update == true){
    AtualizarReg(); // chama função atualizar   
  }else{
    SaveReg(); // chama função salvar
  }
}

//Função para salvar registro
function SaveReg() {
  const formData = {
      nomeConta: document.getElementById('nomeConta').value,
      dataEmissao: document.getElementById('dataEmissao').value,
      valor: parseFloat(document.getElementById('valor').value),
      vencimento: document.getElementById('vencimento').value,
      status: document.getElementById('status').value
  };

  fetch('/salvar_registro', { // Substitua pela sua URL real
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Registro salvo com sucesso!');
          fieldset.disabled = false;  
          bntNovo.value = 'Novo';
          bntSave.disabled = true;
          bntAtualizar.disabled = false;
          bntExcluir.disabled = false;
          bntRight.disabled = false;
          bntLeft.disabled = false;
          formCadastro.reset();
          window.location.href='./cadastro.html';
      } else {
          alert('Falha ao salvar o registro.');
      }
  })
  .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao salvar o registro.');
  });
}

//Função para atualizar registro
function AtualizarReg() {
  const formData = {
      id: document.getElementById('id').value,
      nomeConta: document.getElementById('nomeConta').value,
      dataEmissao: document.getElementById('dataEmissao').value,
      valor: parseFloat(document.getElementById('valor').value),
      vencimento: document.getElementById('vencimento').value,
      status: document.getElementById('status').value
  };

  fetch('/atualizar_registro', { // Substitua pela sua URL real
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
      fieldset.disabled = false;  
      bntNovo.value = 'Novo';
      bntSave.disabled = true;
      bntAtualizar.disabled = false;
      bntExcluir.disabled = false;
      bntRight.disabled = false;
      bntLeft.disabled = false;
      formCadastro.reset();
      window.location.href='cadastro.html';
      alert('Registro atualizado com sucesso!');
      } else {
          alert('Falha ao atualizar o registro.');
      }
  })
  .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao atualizar o registro.');
  });
}

function clickExcluirReg() {
  const id = document.getElementById('id').value;

  fetch(`/excluir_registro/${id}`, { // Substitua pela sua URL real
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Registro excluído com sucesso!');
          window.location.href='./cadastro.html'
      } else {
          alert('Falha ao excluir o registro.');
      }
  })
  .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao excluir o registro.');
  });
}

let registros = [];
let indiceAtual = 0;

// Função para carregar todos os registros
function carregarRegistros() {
    fetch('/registros')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                registros = data.data;
                if (registros.length > 0) {
                    indiceAtual = 0; // Começar com o primeiro registro
                    preencherFormulario(registros[indiceAtual]);
                    atualizarEstadoBotoes();
                }
            } else {
                alert('Nenhum registro encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao carregar registros.');
        });
}

function formatarData(data) {
    const partes = data.split('-'); // Divide a string da data em partes
    if (partes.length === 3) {
        // Se a string estiver no formato esperado 'yyyy-MM-dd'
        const ano = partes[0];
        const mes = partes[1];
        const dia = partes[2];
        return `${dia}-${mes}-${ano}`;
    } else {
        // Caso contrário, retorna a data original
        return data;
    }
}

function formatarValor(valor) {
    const valorFormatado = Number(valor).toFixed(2); // Formata para duas casas decimais
    return valorFormatado.toLocaleString('pt-BR'); // Adiciona separador de milhares para formato brasileiro
}

// Função para preencher o formulário com os dados do registro
function preencherFormulario(registro) {
    document.getElementById('nomeConta').value = registro.nomeConta;
    document.getElementById('dataEmissao').value = formatarData(registro.dataEmissao);
    document.getElementById('valor').value = formatarValor(registro.valor);
    document.getElementById('vencimento').value = formatarData(registro.vencimento);
    document.getElementById('status').value = registro.status;
    document.getElementById('id').value = registro.idConta;
}

// Função para avançar para o próximo registro
function clickMoveD() {
    if (registros.length > 0 && indiceAtual < registros.length - 1) {
        indiceAtual++;
        preencherFormulario(registros[indiceAtual]);
        atualizarEstadoBotoes();
    }
}

// Função para retroceder para o registro anterior
function clickMoveE() {
    if (registros.length > 0 && indiceAtual > 0) {
        indiceAtual--;
        preencherFormulario(registros[indiceAtual]);
        atualizarEstadoBotoes();
    }
}

// Atualizar o estado dos botões (habilitar/desabilitar)
function atualizarEstadoBotoes() {
    document.getElementById('bntRight').disabled = (indiceAtual >= registros.length - 1);
    document.getElementById('bntLeft').disabled = (indiceAtual <= 0);
}

// Inicializar a página carregando registros
document.addEventListener('DOMContentLoaded', () => {
    carregarRegistros();
});
