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