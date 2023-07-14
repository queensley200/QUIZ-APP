function submitClick(){
    var username = document.getElementById('username').value;
    var mail = document.getElementById('userEmail').value;
    var pword = document.getElementById('password1').value;
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var phone_number = document.getElementById('phone_number').value;
    

        // var uname = document.getElementById("uname").value;
        // var mail = document.getElementById("mail").value;
        // var pword = document.getElementById("pword").value;
      
      if(localStorage.getItem("users") == null){
        localStorage.setItem("users",JSON.stringify([{
          uname:"admin",
          phoneNo: "07039092027",
          mail:"admin@gmail.com",
          pword:"Temmy123456789$",
          userType:"admin"
        }]));
      }
      else{
        userRecord = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
        if(userRecord.some(el => el.mail == "admin@gmail.com" || el.uname.toLowerCase() == "admin") == false){
          userRecord.push({
            uname:"admin",
            phoneNo: "07039092027",
            mail:"admin@gmail.com",
            pword:"Temmy123456789$",
            userType:"admin",
            id: Math.floor(Math.random() * 100000)

          });
          localStorage.setItem("users",JSON.stringify(userRecord))
        }
      }




      let userRecords = Array();
      userRecords = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
  
      if ((username == "" || mail == "") || (pword == "" || first_name=='' || last_name=='' || phone_number=='')){
          swal("Fields can't be empty")
      }
      else{
        if(userRecords.some((v)=>{return v.username == username})){
            return outputMessage.innerHTML ="Username already existed!!"
        }
        else if (userRecords.some((v)=>{return v.mail == mail})){
            return output.innerHTML ="Email already existed!!"
        }
        else{
            console.log(userRecords) 
            userRecords.push({
                "id": Math.floor(Math.random() * 1000000),
                "uname": username,
                "mail": mail,
                "pword": pword,
                userType:"user",
                'phoneNo': phone_number,
                "lastName": last_name,
                "FirstName": first_name,


            })


            var regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var email = regex.test(mail);
            var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,15}$/;
            var pw = passw.test(pword)

            if(!pw){ 
                output1.innerHTML = "Too Weak"
            }
            else if(!email){
                swal({
                    title: "email isn't valid",
                });
            }
            else{
                localStorage.setItem("users", JSON.stringify(userRecords));
                swal("Welcome!", "Account created successfully!", "success");
                setTimeout(() => {
                    window.location.assign("login.html") 
                }, 1000);
            }
          } 
        }     
 
    

    // function eyeShow(p = 'password'){
    //   var icon =document.querySelector('.icon')
    //   var icon1 =document.querySelector('.icon1')
    //   var value = document.querySelector('#pword')

    //   if(p == 'text'){
    //     value.setAttribute('type','text')
    //     icon.classList.add('d-none')
    //     icon1.classList.remove('d-none')
    //   }
    //   else{
    //     value.setAttribute('type','password')
    //     icon.classList.remove('d-none')
    //     icon1.classList.add('d-none')
    //   }
    // }

    if(localStorage.getItem("users") == null){
      localStorage.setItem("users",JSON.stringify([{
        uname:"admin",
        mail:"admin@gmail.com",
        phoneNo: "07039092027",
        pword:"Temmy123456789$",
        userType:"admin"
      }]));
    }
    else{
      userRecord = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
      if(userRecord.some(el => el.mail == "admin@gmail.com" || el.uname.toLowerCase() == "admin") == false){
        userRecord.push({
          uname:"admin",
          mail:"admin@gmail.com",
          pword:"Temmy123456789$",
          phoneNo: "07039092027",
          userType:"admin"
        });
        localStorage.setItem("users",JSON.stringify(userRecord))
      }
    }

   
    // Local storage computations
    
}


function showFace(p = 'password'){
    var show = document.getElementById('show')
    var hide = document.getElementById('hide')
    var input = document.getElementById("password1");

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




