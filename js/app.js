 function List(){
    this.tasks= Array();

    this.addTask=function(){    
    var taskTitle = document.getElementById('taskTitle').value;
    var taskDesc = document.getElementById('taskDescription').value;
    var task ={
        title : taskTitle,
        description: taskDesc
    }
    this.tasks.push(task);
    this.localSave();
    this.renderList();
    }
    this.removeTask=function(indx){
        this.tasks.splice(indx,1);
        this.localSave();
        this.renderList();
    }
    this.localSave=function(){
        localStorage.setItem('list',JSON.stringify(this.tasks));
    }
    this.renderList= function(){
        var storedTasks=JSON.parse(localStorage.getItem('list'));
        var container= document.getElementById('testList');
        var list=document.createElement('ul');
        var i;
        for(i=0; i< storedTasks.length; i++){
            var listitem= document.createElement('li');
            var template= '<h4 class="task--title">'+storedTasks[i].title+'</h4>\
                               <p class="task--desc">'+storedTasks[i].description+'</p>\
                               <div class="task--actions">\
                                   <a href="#" class="task--actions__edit"><i class="fas fa-pencil-alt"></i>Edit</a>\
                                   <a href="#" class="task--actions__mark"><i class="fas fa-check-circle"></i>Mark as done</a>\
                                   <a href="#" class="task--actions__delete" data-index="'+i+'"><i class="fas fa-minus-circle"></i>Delete</a>\
                                </div>';
         listitem.innerHTML=template;
         list.appendChild(listitem);       
       }
       container.innerHTML='';
       container.appendChild(list);

    }
}
var theList = new List();

