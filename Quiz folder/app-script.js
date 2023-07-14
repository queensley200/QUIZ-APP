

$(function() {
    "use strict";
     
	 
//sidebar menu js
$.sidebarMenu($('.sidebar-menu'));

// === toggle-menu js
$(".toggle-menu").on("click", function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });	 
	   
// === sidebar menu activation js

$(function() {
        for (var i = window.location, o = $(".sidebar-menu a").filter(function() {
            return this.href == i;
        }).addClass("active").parent().addClass("active"); ;) {
            if (!o.is("li")) break;
            o = o.parent().addClass("in").parent().addClass("active");
        }
    }), 	   
	   

/* Top Header */

$(document).ready(function(){ 
    $(window).on("scroll", function(){ 
        if ($(this).scrollTop() > 60) { 
            $('.topbar-nav .navbar').addClass('bg-dark'); 
        } else { 
            $('.topbar-nav .navbar').removeClass('bg-dark'); 
        } 
    });

 });


/* Back To Top */

$(document).ready(function(){ 
    $(window).on("scroll", function(){ 
        if ($(this).scrollTop() > 300) { 
            $('.back-to-top').fadeIn(); 
        } else { 
            $('.back-to-top').fadeOut(); 
        } 
    }); 

    $('.back-to-top').on("click", function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});	   
	    
   
$(function () {
  $('[data-toggle="popover"]').popover()
})


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


	 // theme setting
	 $(".switcher-icon").on("click", function(e) {
        e.preventDefault();
        $(".right-sidebar").toggleClass("right-toggled");
    });
	
	$('#theme1').click(theme1);
    $('#theme2').click(theme2);
    $('#theme3').click(theme3);
    $('#theme4').click(theme4);
    $('#theme5').click(theme5);
    $('#theme6').click(theme6);
    $('#theme7').click(theme7);
    $('#theme8').click(theme8);
    $('#theme9').click(theme9);
    $('#theme10').click(theme10);
    $('#theme11').click(theme11);
    $('#theme12').click(theme12);
    $('#theme13').click(theme13);
    $('#theme14').click(theme14);
    $('#theme15').click(theme15);

    function theme1() {
      $('body').attr('class', 'bg-theme bg-theme1');
    }

    function theme2() {
      $('body').attr('class', 'bg-theme bg-theme2');
    }

    function theme3() {
      $('body').attr('class', 'bg-theme bg-theme3');
    }

    function theme4() {
      $('body').attr('class', 'bg-theme bg-theme4');
    }
	
	function theme5() {
      $('body').attr('class', 'bg-theme bg-theme5');
    }
	
	function theme6() {
      $('body').attr('class', 'bg-theme bg-theme6');
    }

    function theme7() {
      $('body').attr('class', 'bg-theme bg-theme7');
    }

    function theme8() {
      $('body').attr('class', 'bg-theme bg-theme8');
    }

    function theme9() {
      $('body').attr('class', 'bg-theme bg-theme9');
    }

    function theme10() {
      $('body').attr('class', 'bg-theme bg-theme10');
    }

    function theme11() {
      $('body').attr('class', 'bg-theme bg-theme11');
    }

    function theme12() {
      $('body').attr('class', 'bg-theme bg-theme12');
    }
	
	function theme13() {
      $('body').attr('class', 'bg-theme bg-theme13');
    }
	
	function theme14() {
      $('body').attr('class', 'bg-theme bg-theme14');
    }
	
	function theme15() {
      $('body').attr('class', 'bg-theme bg-theme15');
    }




});





let category = document.getElementById('category');
let statusReport = document.getElementById('Status');
let tbody = document.getElementById('tbody');
// let totalCategory = document.getElementById('totalCategory')

// to Modal input
let status2 = document.getElementById('status2');
let category1 = document.getElementById('category1');

let updater =""




function fetchdata(){
  let countActive = 0;
  let countInActive = 0;
  
  let quizData = JSON.parse(localStorage.getItem('data')); 
  // alert(JSON.stringify(quizData))
  if(quizData !== null){
    tbody.innerHTML = ""
    var i = 1;
    quizData.forEach((element, a)=>{
      if(element.status == 'Active') countActive++
      if(element.status == 'Inactive') countInActive++
        tbody.innerHTML += `

            <tr class="text-white">
                <td>${i++}</td>
                <td>${element.Category}</td>
                <td>${element.status}</td>


                <td class="dropdown">
                <i class="icon-menu menu-icon"></i>
                    <button class="btn text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" onclick="toModal(${element.id})" data-target ="#exampleModal2" data-toggle="modal"  href="#">Edit</a>
                        <a class="dropdown-item" onclick="deleteItems(${a})" href="#">Delete</a>
                    </div>
                
                
                </td>
            </tr>                        
        `;
  
        
    });
    document.getElementById('totalCategory').innerHTML=quizData.length
    document.getElementById('activeUser').innerHTML=countActive
    document.getElementById('inactiveUser').innerHTML=countInActive
  }
}
fetchdata()






function pushDate(){
    duplicate = false;
    if( category.value=='' || statusReport.value=='' ){
        return alert('please select any Item')
    }

    else{
        let storage = {
            id: Math.floor(Math.random() * 100000),
            Category: category.value,
            status: statusReport.value,
            userType:'Admin'
        }
       
 
 
        let holder=[]
        if (localStorage.getItem("data") === null) {
             holder.push(storage)            
        } 
        else {
            holder = JSON.parse(localStorage.getItem('data'))

            holder.forEach (data =>{
                if(storage.Title == data.Title && storage.Category == data.Category) {
                    duplicate=true;
                }   
            })
        
            if(duplicate) {
            alert("Duplicate entry detected")
            } else {
                holder.push(storage)
            }
        }
         
        localStorage.setItem('data', JSON.stringify(holder));
     
    }
    fetchdata()
}

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
           let quizData = JSON.parse(localStorage.getItem('data')); 
            if(quizData){
               quizData.splice(ind,1);
               localStorage.setItem('data', JSON.stringify(quizData));
            }
           
            swal("Poof! Your imaginary file has been deleted!", {
             icon: "success",
            });
            fetchdata()
        
        }else {
           fetchdata()
            swal("Your imaginary file is safe!");
        }

    });
     
}

function toModal(indMod) {
    
    let obj='';
    updater = indMod;

    let quizData = JSON.parse(localStorage.getItem('data'));
    
    for(let index = 0; index < quizData.length; index++) {
        if(indMod==quizData[index].id) {
            obj = quizData[index]
        }
    }
    category1.value = obj.Category;
    status2.value = obj.status 
};

function update(){

    let quizData = JSON.parse(localStorage.getItem('data')); 
    // console.log(quizData)

    if(category1.value =="" || status2.value =="") {
        return alert("Please select any item") 
    }
    else{
        for (let i =0; i < quizData.length; i++){
            //  console.log(quizData)
        
            if (quizData[i].id == updater){
                quizData[i].Category= category1.value
                quizData[i].status= status2.value
                
            }
        }

        category1.value=''
        status2.value=''

    }
    localStorage.setItem('data', JSON.stringify(quizData))

    fetchdata()
    
}













