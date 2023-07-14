
  var uname = document.getElementById('username').value;
  var pword = document.getElementById('password').value;
  
  if(localStorage.getItem("users") == null){
      localStorage.setItem("users",JSON.stringify([{
        uname:"Admin",
        mail:"admin@gmail.com",
        pword:"Temmy123456789$",
        userType:"Admin"
      }]));
    }else{
      users = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
      if(users.some(el => el.mail == "admin@gmail.com" || el.uname.toLowerCasw() == "admin") == false){
        users.push({
          uname:"Admin",
          mail:"admin@gmail.com",
          pword:"Temmy123456789$",
          userType:"Admin"
        })
      }
      localStorage.setItem("users",JSON.stringify(users))
    }
    

  function submitClick(){
    if (uname.value == "" || pword.value == "") {
        swal({
            title:"Can't take empty field",
        });
    }
    else{
      var data = {
          uname: username.value,
          pword: password.value
          // userType:"user"
      };

      let loginStatus = false;
      let users = JSON.parse(localStorage.getItem("users"));
      let authUser = {}

      users.some(el =>{
        if(el.uname == data.uname && el.pword == data.pword){
          loginStatus = true;
          authUser = el
        }
      });

      if(loginStatus){
        result.innerHTML = `Logged in <i class="fa-solid fa-circle-check"></i>`

        swal("Welcome!", "Logged successfully!", "success");

        for(let i = 0; i < users.length; i++){
          if(users[i].userType == "user"){
            window.location.assign("../landing page for quiz/user-page/userPage.html")
          }    
          else{
            window.location.assign("dashboard.html") 
            localStorage.setItem('authUser',JSON.stringify(authUser))
          }
        }
      }
      else{
        swal({
            title: "Account Doesn't exit, incorrect details",
        });
        result.innerHTML = `No Username or Password Match<i class="fa-solid fa-circle-exclamation"></i>`
      }
    }

  }

function showFace(p = 'password'){
  var show = document.getElementById('show')
  var hide = document.getElementById('hide')
  var input = document.getElementById("password");

  if(p == 'text'){
     input.setAttribute('type', 'text') 
     show.classList.add('d-none')
     hide.classList.remove('d-none') 
  }
  else{
      input.setAttribute('type', 'password')
      show.classList.remove('d-none')
      hide.classList.add('d-none')
      
  }
}