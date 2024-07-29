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
    //codigo de cancelamento do formulario
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
  } 
}

function clickSaveReg(){
  if(nomeConta.value == "" && dataEmissao.value == "" && valor.value == "" && vencimento.value == "") {
    alert("Informe todos dados para salvar!");
  }
  else
  {
    if(idConta === true){
      //codigo para update
      fieldset.disabled = false;  
      bntNovo.value = 'Novo';
      bntSave.disabled = true;
      bntAtualizar.disabled = false;
      bntExcluir.disabled = false;
      bntRight.disabled = false;
      bntLeft.disabled = false;
          //codigo de salvar do formulario
      formCadastro.reset();
      alert("Registro atualizado com sucesso!");

    }else{
      //codigo para insert
      fieldset.disabled = false;  
      bntNovo.value = 'Novo';
      bntSave.disabled = true;
      bntAtualizar.disabled = false;
      bntExcluir.disabled = false;
      bntRight.disabled = false;
      bntLeft.disabled = false;
          //codigo de salvar do formulario
      formCadastro.reset();
      alert("Registro gravado com sucesso!");
    }
  } 
}