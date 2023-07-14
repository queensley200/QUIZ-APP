let userPageCategory = document.getElementById("userPageCategory");
let managequizTable = document.getElementById("managequizTable")
let cardDisplay = document.getElementById("cardDisplay")


let quizData = JSON.parse(localStorage.getItem('data')); 
if(quizData !== null){
    quizData = quizData.filter(el => el.status=="Active");  
    userPageCategory.innerHTML= "";
    userPageCategory.innerHTML= `<option value="">Select</option>`;

    quizData.forEach(element => {

        userPageCategory.innerHTML +=`

            <option value="${element.Category}">
                ${element.Category}
            </option>
        `
    });
        
}


let quizes = [] 
function userQuiz() {
    
    let userCategoryData = JSON.parse(localStorage.getItem("quiz"))
    if(userCategoryData !==null) {
        if(userPageCategory.value) {
            cardDisplay.innerHTML = ""
            let categoryUser = userCategoryData.filter(el => 
                el.fetchCategory.toLowerCase() == userPageCategory.value.toLowerCase()
            )
            if (categoryUser == ""){
                return cardDisplay.innerHTML = `
                    <div class="col-10 mx-auto mb-2">
                        <h3 style="color: #f5a425;" >No records found for selected quiz! please select any other.</h3>
                    </div>
                `
            }

            
            for(let i = 0; i < categoryUser.length; i++) {
                let relatedQuiz = []
                categoryUser.forEach((element, ind) => {
                    if(categoryUser[i].parentId == element.parentId){
                        relatedQuiz.push(element)
                    }
                })
                // console.log(relatedQuiz);
                let filterRelatedQuiz = relatedQuiz.filter(elem => {
                    let status = true

                    quizes.forEach((el,ind) => {
                        for (let i = 0; i < quizes[ind].length; i++) {
                            if (quizes[ind][i].id == elem.id) {
                               status = false 
                            }
                            
                        }
                    })
                    return status
                })

                if(filterRelatedQuiz.length) quizes.push(filterRelatedQuiz)
                // console.log(filteredRelatedQuiz);
                
               
            }
            // console.log(quizes); 
            for(let i = 0; i < quizes.length; i++) {
                cardDisplay.innerHTML +=   `
                    <div class="col-10 mx-auto mb-2">
                        <div class="card" style="background-color: #f5a425;">
                            <div  class=" d-flex justify-content-between">
                                <div  class="">
                                    <h4 class="display-5 text-white" style="background-color: #172239;">
                                    Category
                                    </h4>
                                </div>
                    
                                <div class="">
                    
                                    <h4 class="display-5 text-white pr-3" style="background-color: #172239;">
                                    Question 
                                    </h4>
                                </div>
                            </div>
            
                        
                        </div> 
                        <div class="card">
                            <div class="card-body" >
                                <div class="d-flex justify-content-between">
                                    <div  class="">
                                        <h4 class="display-5">
                                            ${userPageCategory.value}
                                        </h4>
                                    </div>
                
                                    <div class="  ">
                                        <h4 class="pr-4" value=" ${quizes[i].length}">
                                            ${quizes[i].length}
                                        </h4>
                                    </div>  
                                </div>
        
                                <div class="card-footer col-12 text-center">
                                <button type="button" class="btn" onclick="takeQuiz(${i})" style="background-color: #f5a425;">Take Quiz</button>
            
                                </div>
                                
                            </div>
        
                        </div>
                    
                    </div
                `
            }

           

        }
    }
}  
userQuiz() 



function takeQuiz(ind){
    var users = JSON.parse(localStorage.getItem("users"))
    loginStatus = false
    
    users.some(el =>{
        if( el.mail || el.pword) {
            loginStatus = true;
            authUser = el
        }
    });
    if(loginStatus) {

        let quizData = []
        
        quizes.forEach((item, i) => {
            if(i == ind) {
                quizData = item
            }
            
        })
        localStorage.setItem('activeQuiz', JSON.stringify(quizData))
        
        setTimeout(() => {
        window.location.assign("UserQuizPage.html")

        }, 1000);
        
    } 

   
}


