let sign_up = () => {  
  let inputs = document.querySelectorAll(.input-container);
  for (let i =0; i < inputs.length; i++){
    document.querySelectorAll('.input-container')[i].className ="input-container d_block";
   document.querySelector('.btn').innerHTML = "ok" ; 
}
}
 
function log_in() {
let inputs =  document.querySelectorAll(.input-container);
  
 setTimeout( function() {
for( let d= 0; d < inputs.length ; d++  ) {
if (d == 0){
  document.querySelectorAll('.input-container')[d].className ="input-container d_block";
}
  else if (d == 2) {
   document.querySelectorAll('.input-container')[d].className ="input-container d_block"; 
  }
  else {
    document.querySelectorAll('.input-container')[d].className ="input-container d_none";
  }
  }
 },200 );

  document.querySelector('.btn').innerHTML = "Sign In";    
}