function novoReg(){
  const bntNovo = document.getElementById('bntNovo');
  const bntSave = document.getElementById('bntSave');
  const bntAtualizar = document.getElementById('bntAtualiza');
  const bntDeleta = document.getElementById('bntDeleta');
  const bntRight = document.getElementById('bntRight');
  const bntLeft = document.getElementById('bntLeft');
  const fieldset = document.getElementById('fldSet');

    if(bntNovo.value === 'Novo') {
      fieldset.disabled = false;  
      bntNovo.value = 'Cancelar';
      bntSave.disabled = false;
      bntAtualizar.disabled = false;
      bntExcluir.disabled = false;
      bntRight.disabled = false;
      bntLeft.disabled = false;
    }else{
      bntNovo.value = 'Novo';
      bntSave.disabled = true;
      fieldset.disabled = true; 
      bntAtualizar.disabled = true;
      bntExcluir.disabled = true;
      bntRight.disabled = true;
      bntLeft.disabled = true;      
    }
 
  }