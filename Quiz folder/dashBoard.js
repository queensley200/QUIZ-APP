    
    
    
    
    // Fetchdata for Dashboard that indicates Total category
function fetchdata(){
  
  let quizData = JSON.parse(localStorage.getItem('data')); 
  // alert(JSON.stringify(quizData))
  if(quizData !== null){

    document.getElementById('totalCategory').innerHTML=quizData.length

  };

}

fetchdata()


let displayName = document.getElementById('displayName');
let displayEmail = document.getElementById('displayEmail');
let auth = JSON.parse(localStorage.getItem('authUser'));
console.log(auth);
if(auth){
  displayName.innerHTML = 'Welcome' + ' ' + auth.name
  console.log(auth.name)
}
if(auth){
  displayEmail.innerHTML =  auth.email
} 
else{
  window.location.assign ('register.html')
}
