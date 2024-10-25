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
    formCadastro.reset();
    emissaoInputDate();
    vencimentoInputDate();
  }else{
    bntNovo.value = 'Novo';
    bntSave.disabled = true;
    fieldset.disabled = true; 
    bntAtualizar.disabled = false;
    bntAtualizar.value = 'Atualizar'
    bntExcluir.disabled = false;
    bntRight.disabled = false;
    bntLeft.disabled = false;
    update = false;
    emissaoInputText();
    vencimentoInputText();
    formCadastro.reset();
    carregarRegistros();
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
    emissaoInputDate();
    vencimentoInputDate();
  } 
}

function clickSaveReg(){
    if (!nomeConta || !dataEmissao || !valor || !vencimento || !status) {
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

  fetch('/salvar_registro', { 
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
          emissaoInputText();
          vencimentoInputText();
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
      id: document.getElementById('idConta').value,
      nomeConta: document.getElementById('nomeConta').value,
      dataEmissao: document.getElementById('dataEmissao').value,
      valor: parseFloat(document.getElementById('valor').value),
      vencimento: document.getElementById('vencimento').value,
      status: document.getElementById('status').value
  };

  const id = document.getElementById('idConta').value;

  fetch(`/atualizar_registro/${id}`,{ 
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
      alert('Registro atualizado com sucesso!');
      fieldset.disabled = false;  
      bntNovo.value = 'Novo';
      bntSave.disabled = true;
      bntAtualizar.disabled = false;
      bntExcluir.disabled = false;
      bntRight.disabled = false;
      bntLeft.disabled = false;
      formCadastro.reset();
      emissaoInputText();
      vencimentoInputText();
      window.location.href='./cadastro.html';
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
  const id = document.getElementById('idConta').value;

  if (confirm(`Tem certeza que deseja excluir o registro com ID ${id}?`)) {
        fetch(`/excluir_registro/${id}`,{ 
            method: 'DELETE'
        })
        //.then(response => response.json())
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir o registro.');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Registro excluído com sucesso!');
                window.location.href='./cadastro.html';
            } else {
                alert('Falha ao excluir o registro.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao excluir o registro.');
        });
    } 
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
                    indiceAtual = 0; 
                    preencherFormulario(registros[indiceAtual]);
                    atualizarEstadoBotoes();
                    bntExcluir.disabled = false;
                }
            } else {
                bntExcluir.disabled = true;
                alert('Nenhum registro encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao carregar registros.');
        });
}

function formatarValor(valor) {
    const valorFormatado = Number(valor).toFixed(2); // Formata para duas casas decimais
    return valorFormatado.toLocaleString('pt-BR'); // Adiciona separador de milhares para formato brasileiro
}

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

// Função para preencher o formulário com os dados do registro
function preencherFormulario(registro) {
    document.getElementById('idConta').value = registro.idContas;
    document.getElementById('nomeConta').value = registro.nomeConta;
    document.getElementById('dataEmissao').value = formatarData(registro.dataEmissao);
    document.getElementById('valor').value = formatarValor(registro.valor);
    document.getElementById('vencimento').value = formatarData(registro.vencimento);
    document.getElementById('status').value = registro.status;
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

//funcão para alterar input Emissão para text para date
function emissaoInputDate() {
    // Obtém o elemento input inicial
    const inpuTextEmissao = document.getElementById('dataEmissao');
    // Cria um novo elemento input de tipo date para emissão
    const inputDtEmissao = document.createElement('input');
    inputDtEmissao.type = 'date';
    inputDtEmissao.id = 'dataEmissao';
    inputDtEmissao.name = 'dataEmissao';

    // Substitui o input text pelo input date no DOM
    inpuTextEmissao.parentNode.replaceChild(inputDtEmissao, inpuTextEmissao);
}

//funcão para alterar input vencimento para text para date
function vencimentoInputDate() {
    // Obtém o elemento input inicial
    const inpuTextVenc = document.getElementById('vencimento');
    // Cria um novo elemento input de tipo date para emissão
    const inputDtVenc = document.createElement('input');
    inputDtVenc.type = 'date';
    inputDtVenc.id = 'vencimento';
    inputDtVenc.name = 'vencimento';

    // Substitui o input text pelo input date no DOM
    inpuTextVenc.parentNode.replaceChild(inputDtVenc, inpuTextVenc);
}

function emissaoInputText() {
    // Obtém o elemento input inicial
    const inputDate = document.getElementById('dataEmissao');

    // Cria um novo elemento input de tipo text
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.id = 'dataEmissao';
    inputText.name = 'dataEmissao';
    
    // Substitui o input date pelo input text no DOM
    inputDate.parentNode.replaceChild(inputText, inputDate);
}

function vencimentoInputText() {
    // Obtém o elemento input inicial
    const inputDtVenc = document.getElementById('vencimento');

    // Cria um novo elemento input de tipo text
    const inputTextVenc = document.createElement('input');
    inputTextVenc.type = 'text';
    inputTextVenc.id = 'vencimento';
    inputTextVenc.name = 'vencimento';
    
    // Substitui o input date pelo input text no DOM
    inputDtVenc.parentNode.replaceChild(inputTextVenc, inputDtVenc);
}

// Inicializar a página carregando registros
document.addEventListener('DOMContentLoaded', () => {
    carregarRegistros();
});
