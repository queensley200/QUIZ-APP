
    let alertDisplay = document.getElementById("alertDisplay");
    let alertDisplay2 = document.getElementById("alertDisplay2");
    let staticBackdrop = document.getElementById("staticBackdrop");
    let scoreMe = document.getElementById("scoreMe");
    let quizlength = document.getElementById("quizlength");
    let endQuizButton = document.getElementById("endQuizButton");
    let scoreText = document.getElementById("scoreText")
    let saveQuiz = document.getElementById("saveQuiz")
    let startOver = document.getElementById("startOver")
    let score = 0;

    function Refetch(){
        var quizez = JSON.parse(localStorage.getItem("activeQuiz"))
        
    }
    Refetch()
    var quizez = JSON.parse(localStorage.getItem("activeQuiz"))

    function OK(ind){
        let obj = ""
        alertDisplay.style.display = "none"
        alertDisplay2.style.display = "block"
       for (let i = 0; i < quizez.length; i++) {
            let displayQuizCard = document.getElementById(`displayQuizCard`);

        // console.log(quizez);
        // let question = quizez[i].map((el) => {
        //      return el.question
        //    });
           let Answers = quizez[i].options.map((el) =>{
             return el.name
        })
        // let Answer = Answers[i].filter((el)=> {
        //     return el.name
        // }).map((el) =>{
        //      return el.name
        // })
        //    console.log(Answer);
        displayQuizCard.innerHTML += `
        <div class="section card-us col-md-12 pb-2"  >
          <div class="container" >
            <div class="question pt-2 m-auto">
              <div class="d-flex justify-content-between align-items-center pt-2 pb-2 pr-2 pl-2" style='background-color: #001a2f; border-radius:10px'>
                <h4>Question ${i + 1}</h4><span>(${i + 1} of ${quizez.length})</span>
              </div>
            </div>
            <div class="question  pt-2 m-auto">
                
              <h5 class="py-2 h5" id="ques${i}">${quizez[i].question}</h5>
              <input ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" type="hidden" id="noOfoptions${i}" value="${Answers.length}">
            
              <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="myQuizOption${i}">
                  
                  
              </div>
                
            </div>
          </div>
        </div>
        `
        
        if(quizez[i].id){
            let myQuizOption = document.getElementById(`myQuizOption${i}`)
            for(let a = 0; a < Answers.length; a++){
                myQuizOption.innerHTML +=`
                    <div class="">
                        
                        <label class="options"> ${Answers[a]}
                            <input type="radio" name="gridRadios${i}" onclick="fuc(${a})" id="gridRadios${i}${a}" value="${Answers[a]}">
                            <span class="text-white checkmark"></span>
                           
                        </label>                                   
                    </div>
                `
            }
        }
       }
    };
   

    formal.addEventListener("submit", endQuiz)
    function endQuiz(e){
        e.preventDefault();
        let staticBackdrop = document.getElementById("staticBackdrop");
        let clientName = ""
        var auth = JSON.parse(localStorage.getItem("authUser"))
            if(auth){
                clientName = auth.FirstName
            }
        swal({
            title: "Are you sure?",
            text: "Once you end, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willEnd) => {
            if (willEnd) {
                
                quizez.forEach((element, i) => {
                    let obj = {
                        q : document.getElementById(`ques${i}`).innerHTML,
                        optionLength : Number(document.getElementById(`noOfoptions${i}`).value),
                        ans : ""
                    }
                    
                    for(let a = 0; a < obj.optionLength; a++){
                        let checkedAnswer = document.getElementById(`gridRadios${i}${a}`);
                        if(checkedAnswer.checked){
                            obj.ans = checkedAnswer.value 
                        }
                    }
                    if (element.question == obj.q) {
                        let systemCorrectAns = element.options.find(el => el.isCorrect == true).name
                        if(systemCorrectAns == obj.ans){
                            score++
                        }
                        scoreMe.innerHTML = score;
                        quizlength.innerHTML = quizez.length
                        if(score == 0){
                            scoreText.innerHTML = `Oops, C'mon ${clientName}, you can do more better you know. <p>Would you like to start over again?</p>`
                            saveQuiz.style.display = "none"
                            startOver.style.display = "block"
                        }
                        else if(score < Number(quizez.length / 2)){
                            scoreText.innerHTML = `Oops, you actually did well ${clientName}, but you can do more better. <p>Would you like to save the just concluded quiz to your history?</p>`
                            saveQuiz.style.display = "block"
                            startOver.style.display = "none"
                        }
                        else{
                            scoreText.innerHTML = `You have done absolutely well ${clientName},<p>Would you like to save the just concluded quiz to your history?</p>`
                            saveQuiz.style.display = "block"
                            startOver.style.display = "none"
                        }
                    }
                });
                swal("Poof! You have succesfully completed your quiz!", {
                icon: "success",
                });
                jQuery.noConflict();
                $('#staticBackdrop').modal('show');
            } 
            else {
                swal("Your imaginary file is safe!");
            }
            });
           
    }
    
    function saveQuizToHistory(){
        var auth = JSON.parse(localStorage.getItem("authUser"))
        let quiz_History = JSON.parse(localStorage.getItem("quiz_History"))
        let client_Quiz_history = []
        let history = {
            Quiz_history: quizez,
            clientScore: score,
            userId: Math.floor(Math.random() * 100000),
            authId: auth.id
        }
        if(quiz_History == null){
            client_Quiz_history.push(history)
        }
        else{
            client_Quiz_history = quiz_History
            client_Quiz_history.push(history)
        }
        
        localStorage.setItem("quiz_History", JSON.stringify(client_Quiz_history))
        setTimeout(() => {
            location.assign("userPage.html")
        }, 2000)
    }

    
    

