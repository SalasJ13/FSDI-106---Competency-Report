//clase 2
var isImportant = false;
var isAsideVisible = true;

function toggleImportant(){
    console.log("Icon click")

    let icon=$(".iImportant");
    if(isImportant){
        icon.removeClass("fas").addClass("far");
        isImportant = false;
    }
    else{
        icon.removeClass("far").addClass("fas");
        isImportant =   true;
    }
    
}
function toggleDetails(){
    let aside =$("aside");

    if(isAsideVisible){
        aside.hide();
        isAsideVisible=false;
    }
    else{
        aside.show();
        isAsideVisible=true;
    }
}


function saveTask(){
    console.log("Saving task");
    //guardamos lo que se ingresa
    let title = $("#txtTitle").val();
    let dateTime = $("#txtDueDate").val();
    let location=$("#txtLocation").val();
    let description=$("#txtDescri").val();
    let participants=$("#txtParti").val();
    let color =$("#txtColor").val();
    
    //Validaciones
    if(!title){
        alert("Error, add the title");
        console.log("titulo")
        return;
    }

    let theTask = new Task(isImportant,title,description,location,participants,color,dateTime)
    console.log(theTask);

    console.log(JSON.stringify(theTask));

    //prueba de testing
    $.ajax({
        type:"POST",
        url:"https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(theTask),
        contentType:"application/json",

        success: function(response){
            console.log("Server says: ", response);
            let saveTask= JSON.parse(response);

            displayTask(theTask);
            clearForm();
        },
        error: function(details){
            console.log("Save Error: ", details);

        }
    });

    //displayTask(theTask);
    //clearForm();
}
function clearForm() {
    $("#txtTitle").val("");
    $("#txtDueDate").val("");
    $("#txtLocation").val("");
    $("#txtDescri").val("");
    $("#txtParti").val("");
    $("#txtColor").val("");
}

function displayTask(task){
    let syntax= `
    <div class="task" style="box-shadow: 12px 12px 16px 0px ${task.color}">
    <i class="far fa-star "></i>
        <div class="task-tittle">  
            <h3>${task.title}</h3>
            <p>Description: ${task.description}</p>
        </div>

        <div class="detalles">
            <label class="local">Location: ${task.location}</label>
            <label class="date">DateTime: ${task.dateTime}</label>
        </div>
    </div>`;

    $(".task-container").append(syntax);
}

function  fetchTask(){
    $.ajax({
        type:"GET",
        url:"https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            console.log("Server says: ", response);

            let allTask = JSON.parse(response);
            for(let i=0;i<allTask.length;i++){
                let task =allTask[i];
                console.log(task);

                if(task.user=="Salas"){
                    displayTask(task);
                }
                
            }

        },
        error: function(details){
            console.log("Req Error",details);
        }
    });
}

function testRequest(){
    $.ajax({
        url:"https://restclass.azurewebsites.net/api/test",
        type:"GET",
        success: function(response){
            console.log("Server says: ", response);

        },
        error: function(details){
            console.log("Req Error",details);
        }
    });
}

function deleteAllTask(){
    $.ajax({
        type:"DELETE",
        url:"https://fsdiapi.azurewebsites.net/api/tasks/clear/Salas", 
        success: function(){
            $(".task-container").html("");
        }
    });
    
}

function init(){
    console.log("Calendar")

    //Se ingresa a la base de datos'
    fetchTask();
    //testRequest();
    //hook events
    $("#btnSave").click(saveTask);

    $(".iImportant").click(toggleImportant);
    $("#btnToggleDet").click(toggleDetails);
    $("#btnDelete").click(deleteAllTask);
}
window.onload=init;