 
function List(name){
    this.listTitle=name;
    this.listId='';
   this.tasks=Array();
   
   this.addTask=function(){    
   var taskTitle = document.getElementById(this.listId+'__title').value;
   var taskDesc = document.getElementById(this.listId+'__desc').value;
   var task ={
       title : taskTitle,
       description: taskDesc,
       done: 'open'
       }
   theLists.lists.listId.tasks.push(task);
   theLists.localSave();
   theLists.renderLists();
   }
   this.removeTask=function(indx){
       theLists.lists.listId.tasks.splice(indx,1);
       theLists.localSave();
       theLists.renderLists();
   }
   this.markTask=function(indx){
       theLists.lists.listId.tasks[indx].done='done';
       theLists.localSave();
       theLists.renderLists();
   }
   this.renderList= function(){
       var container= document.getElementById('testList');
       var list=document.createElement('ul');
       var tasks=theLists.lists.listId.tasks;
       var i;
       for(i=0; i< tasks.length; i++){
           var listitem= document.createElement('li');
           var template= '<h4 class="task--title '+tasks[i].done+'">'+tasks[i].title+'</h4>\
                              <p class="task--desc'+tasks[i].done+'">'+tasks[i].description+'</p>\
                              <div class="task--actions">\
                                  <a href="#" class="task--actions__mark"><i class="fas fa-check-circle"></i>Mark as done</a>\
                                  <a href="#" class="task--actions__delete" data-title="'+tasks[i].id+'" data-index="'+i+'" onclick="theList.removeTask(this.dataset.index)"><i class="fas fa-minus-circle"></i>Delete</a>\
                               </div>';
        listitem.innerHTML=template; 
        list.appendChild(listitem);     
      }

   }

}

function ListManager(){
        if(localStorage.getItem('lists')){
            this.lists=JSON.parse(localStorage.getItem('lists'));    
        }else{
            this.lists= Object();
        } 
        this.addList= function(){
            var name=document.getElementById('listTitle').value;
            var list= new List(name);
            var id= name.split(" ").join("-");
             list.listId=id;
            this.lists[id]= list;
            this.localSave();
            this.renderLists();
        }
        this.removeList= function(id){
            delete this.lists[id];
            this.localSave();
            this.renderLists();
        }
        this.localSave=function(){
            localStorage.setItem('lists',JSON.stringify(this.lists));
        }
        this.renderLists =function(){
            var storedLists = JSON.parse(localStorage.getItem('lists'));
            var container= document.getElementById('testList');
            var template='';
            for(var prop in this.lists){
           template+='<div class="list"><h3>'+this.lists[prop].listTitle+'</h3>\
            <div class="task--action__add">\
                <input type="text" id="'+this.lists[prop].listId+'__title" placeholder="Add a title">\
                <textarea name="desc" id="'+this.lists[prop].listId+'__desc" cols="30" rows="3">Add a description</textarea>\
                <a href="#" onclick="theLists.lists.'+this.lists[prop].listId+'.addTask()"><i class="fas fa-plus-circle"></i>Add task</a>\
            </div>';
            //template+= this.lists[prop].renderList();
            template+='<div class="list--actions">\
                <a href="#" class="list--actions__copy"><i class="fas fa-copy"></i>Copy</a>\
                <a href="#" class="list--actions__save"><i class="fas fa-save"></i>Save</a>\
                <a href="#" class="list--actions__delete" onclick="theLists.removeList(\''+this.lists[prop].listId+'\')"><i class="fas fa-minus-circle"></i>Delete</a>></a>\
            </div>\
            </div>';
                
            }
            container.innerHTML=template;

        }
}
theLists=new ListManager();
theLists.renderLists;

