    // Fetchdata for Dashboard that indicates Total category
function fetchdata(){
  
    let quizData = JSON.parse(localStorage.getItem('data')); 
    // alert(JSON.stringify(quizData))
    if(quizData !== null){

        document.getElementById('totalCategory').innerHTML=quizData.length

    };

}

fetchdata()


// This diplay the name of the admin on the frontend
let displayName = document.getElementById('displayName');
let displayEmail = document.getElementById('displayEmail');
let auth = JSON.parse(localStorage.getItem('authUser'));
// console.log(auth);
if(auth){
    displayName.innerHTML = 'Welcome' + ' ' + auth.name
    // console.log(auth.name)
}
if(auth){
    displayEmail.innerHTML =  auth.email
} 
else{
    window.location.assign ('register.html')
}

    
    
    
    
let numOfQuiz = document.getElementById("numberOfQuiz");
let colGenerator = document.getElementById("cardsGenerator");
let statusCategory = document.getElementById("status2");
let statusCategory3 = document.getElementById("status3");
let selCategory = document.getElementById("selCategory");
let managequizTable   = document.getElementById("managequizTable");
let editCorrectAnswer = document.getElementById("editCorrectAnswer");
let editOption = document.getElementById("editOption");
let selOption = document.getElementById("selOption");
let filterSearch = document.getElementById("filterSearch");



selCategory.style.display = "none"


// console.log(colGenerator);

let quizData = JSON.parse(localStorage.getItem('data')); 
    // alert(JSON.stringify(quizData))
if(quizData !== null){
        quizData = quizData.filter(el => el.status=="Active");  
        
        statusCategory.innerHTML= "";
        quizData.forEach(element => {

            statusCategory.innerHTML +=`

                <option value="${element.Category}">
                    ${element.Category}
                </option>
            `
        });
          
}

// Category filter

if(quizData !== null){
    quizData = quizData.filter(el => el.status=="Active");  
    
    statusCategory3.innerHTML= "";
    statusCategory3.innerHTML= `<option value="">Select</option>`;

    quizData.forEach(element => {

        statusCategory3.innerHTML +=`

            <option value="${element.Category}">
                ${element.Category}
            </option>
        `
    });
        
}



function manageQuizfetchData(){
    
    let pushDataToLocal = JSON.parse(localStorage.getItem("quiz"))
    if(pushDataToLocal !== null){

        if(filterSearch.value){
            pushDataToLocal = pushDataToLocal.filter(el=> 
            el.fetchCategory.toLowerCase().startsWith(filterSearch.value.toLowerCase()) || el.question.toLowerCase().startsWith(filterSearch.value.toLowerCase()));
            if(pushDataToLocal == ""){
                managequizTable.innerHTML = `No record found`
            } 
        };
           
 
        if(statusCategory3.value){
            pushDataToLocal = pushDataToLocal.filter(el => 
            el.fetchCategory.toLowerCase() == statusCategory3.value.toLowerCase()) 
        };
        

        managequizTable.innerHTML = ""
        for (let z = 0; z < pushDataToLocal.length; z++) {

            // creating an array based on the curent array
            let joined_options = pushDataToLocal[z].options.map(item => {
                return item.name
            }).join( ",<br> ");

            let corAnswer = pushDataToLocal[z].options.filter(itemized => {
                return itemized.isCorrect === true
            }).map(itemized => {
                return itemized.name
            }) [0];

            managequizTable.innerHTML += `
                <tr>
                    <td><input type="checkbox"></td>
                    
                    <td> ${z + 1} </td>
                    <td> ${pushDataToLocal[z].fetchCategory} </td>
                    <td> ${pushDataToLocal[z].question} </td>
                    <td> ${joined_options} </td>
                    <td> <span class="badge badge-success">${corAnswer} </span></td>

                    <td class="dropdown">
                        <i class="icon-menu menu-icon"></i>
                        <button class="btn text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" onclick="toModal(${pushDataToLocal[z].id})" data-target ="#exampleModal1" data-toggle="modal"  href="#">Edit</a>
                            <a class="dropdown-item" onclick="deleteItems(${z})" href="#">Delete</a>
                        </div>

                    </td>
                </tr>


             
            `      
            
        }
    }
    
     
}
manageQuizfetchData()


function goButton(){
    if(numOfQuiz.value=="") return false
    colGenerator.innerHTML=""
    if( Number(numOfQuiz.value) > 50) return false
    selCategory.style.display = "";
    
    for(i=0; i < Number(numOfQuiz.value); i++){
        colGenerator.innerHTML += `
            <div class="col-md-4">
                <form action="" class="modal-body">                        

                    <div class="card">
                        
                        <div class="card-body " id="allModalForm">

                            <div class="input-group pb-2">
                                <div class="input-group pb-2 justify-content-center" >
                                    <span class="input-group-text" istyle="background-color: #001a2f;" >Question ${i + 1}</span>
                                </div> 
                                <textarea name="" class="bg-info" id="setQuestion${i}" cols="36" rows="3" ></textarea>
                            </div>
                            <div class="input-group pb-3">
                                <div class="input-group pb-2 justify-content-center">
                                    <span class="input-group-text" style="background-color: #001a2f;">Options ${i + 1}</span>
                                </div> 
                                <select id="selOption${i}" class="form-control custom-select" onchange="generateOpsInput(${i})">
                                    <option value="">Please select an option</option> 
                                    <option value="2">2</option> 
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select> 
                            </div>

                            <div class="row pb-3 justify-content-center" id="option${i}">
                            
                            </div>

                            <div class="input-group pb-2 justify-content-center">
                                <span class="input-group-text" style="background-color: #001a2f;">Correct Answer ${i + 1}</span>
                            </div> 
                            <div class="row" id="correctAnswer${i}" >   
                                
                            </div>
                                

                        
                        </div>

                    </div>

                </form> 
            </div >
        `
    }
}

goButton()


function generateOpsInput(inp) {
    let opts = document.getElementById(`option${inp}`);
    let selOption = document.getElementById(`selOption${inp}`);
    let correctAnswer = document.getElementById(`correctAnswer${inp}`)
    opts.innerHTML=""
    correctAnswer.innerHTML =""    
   for(let i = 0; i < Number(selOption.value); i++) {
        // document.write("The Alphabets from A" +
        // " to Z are: " + "</br>");

        
        opts.innerHTML +=`
            <div class="col-md-12 pt-2 input-group ">
                <div class="input-group-prepend">
                    <button class="input-group-text">Option ${i + 1}</button>
                
                    <div>
                        <input type="text" id="option${i}${inp}" class="form-control question_options">
                    </div>
                </div> 
            
            </div>


        `
        // document.write(
        // String.fromCharCode(i) + " ");
        

        
    
        correctAnswer.innerHTML +=`
        
            <div class="form-check" style="margin-left:35%;">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3${i}${inp}" value="option${i,inp}">
                <label class="form-check-label" for="exampleRadios3">
                    Option ${i + 1}
                </label>
            </div>

        `

    }
}



function saveChanges(){
    // let optionData = JSON.parse(localStorage.getItem('data'));  
   
    let optionHolder=[]
    let duplicateStatus=false
    let parentId= Math.floor(Math.random() * 100000) * Math.floor(Math.random() * 100000)
    
    
    for (let i = 0; i < Number(numOfQuiz.value); i++) {
        let obj = {
            id: Math.floor(Math.random() * 100000),
            parentId,
            fetchCategory: statusCategory.value,
            question: document.getElementById(`setQuestion${i}`).value,
            options:[]

        }
        let optNo = Number(document.getElementById(`selOption${i}`).value);
        for (let ind = 0; ind < optNo; ind++) {
            obj.options.push({
                name: document.getElementById(`option${ind}${i}`).value,
                isCorrect: document.getElementById(`exampleRadios3${ind}${i}`).checked
            })
            
            
        }

        
        optionHolder.push(obj)
        
    } 
   
    
    let arr=[]
    if(localStorage.getItem('quiz') == null )   {
        arr.push(...optionHolder)
    } 
    
    else{
        arr = JSON.parse(localStorage.getItem('quiz'));
        arr.forEach(item => {
            if(optionHolder.some((el) => el.question == item.question)) {
                duplicateStatus=true;
            }
        })

        if(duplicateStatus) {
            alert('Duplicate entry detected')
            return;
        } 
        arr.push(...optionHolder)
    }
        
      

    localStorage.setItem('quiz', JSON.stringify(arr))
    manageQuizfetchData()
}


// delete quiz

function deleteItems (ind) {

    
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
           let quizData = JSON.parse(localStorage.getItem('quiz')); 
            if(quizData){
               quizData.splice(ind,1);
               localStorage.setItem('quiz', JSON.stringify(quizData));
            }
           
            swal("Poof! Your imaginary file has been deleted!", {
             icon: "success",
            });
            manageQuizfetchData()
        
        }else {
            manageQuizfetchData()
            swal("Your imaginary file is safe!");
        }

    });
     
}




let setUpdate = ""
let setUpdateQuestion = document.getElementById("setUpdateQuestion")

function toModal(indMod) {
    
    let object='';
    setUpdate = indMod;

    let quizData = JSON.parse(localStorage.getItem('quiz'));
    
    for(let index = 0; index < quizData.length; index++) {
        if(indMod==quizData[index].id) {
            object = quizData[index]
        }
    }
    setUpdateQuestion.value = object.question;
    selOption.value  = object.options.length

    editOptsInput(object.options)
    
};





function editUpdate(){
    let pushDataToLocal = JSON.parse(localStorage.getItem("quiz"))
 
    // console.log(pushDataToLocal)

    if(setUpdateQuestion.value =="") {
      
        return alert("Please select any item") 
    }
    else{
        for (let i =0; i < pushDataToLocal.length; i++){
        //  console.log(pushDataToLocal)
            if (pushDataToLocal[i].id == setUpdate){
                pushDataToLocal[i].question= setUpdateQuestion.value
                
            }
        }

        setUpdateQuestion.value=''

    }
    localStorage.setItem('quiz', JSON.stringify(pushDataToLocal))

    manageQuizfetchData()
    
}


function editOptsInput(arrayOption){

    editOption.innerHTML = ""
    let correctAnswerIndex = 0;
    editCorrectAnswer.innerHTML = ""
    for (let i = 0; i < arrayOption.length; i++) {
        
        // let Answer = arrayOption[i].options.filter(itemized => {
        //     return itemized.isCorrect === true
        // })

        editOption.innerHTML +=`
            <div class="col-md-12 pt-2 input-group " style="margin-left:31%;">
                <div class="input-group-prepend">
                    <button class="input-group-text">Option ${i + 1}</button>
                
                    <div>
                        <input type="text" value="${arrayOption[i].name}" id="editOption${i}" class="form-control question_options">
                    </div>
                </div> 
            
            </div>


        `;

        editCorrectAnswer.innerHTML +=`
        
            <div class="form-check" style="margin-left:40%;">
                <input class="form-check-input" type="radio" name="exampleRadio" checked="false" value="editRadio${i}" id="exampleRadios3${i}" value="">
                <label class="form-check-label" for="exampleRadios3${i}">
                    Option ${i + 1}
                </label>
            </div>

        `;

        if(arrayOption[i].isCorrect){
            correctAnswerIndex = i;
        }
    };

    document.getElementById(`exampleRadios3${correctAnswerIndex}`).checked = true;
    
}


// var checkAllBox1 = document.getElementById("checkAllBox")

console.log(checkboxes);
function checkAll(myCheckbox) {
    var checkboxes = document.querySelectorAll('input');

    if(myCheckbox.checked == true) {
        checkboxes.forEach(checkbox =>{
            checkbox.checked = true;
        })
    }
    else {
        checkboxes.forEach(function(checkbox){
            checkbox.checked = false
        });
    }

}





