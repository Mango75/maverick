
function List(){
    this.addTask=function(){    
        var tasks=JSON.parse(localStorage.getItem('lists'));
        var taskTitle = document.getElementById('addTitle').value;
        var taskDesc = document.getElementById('addDesc').value;
        var task ={
            title : taskTitle,
            description: taskDesc,
            done: 'open'
            };
        tasks.push(task);
        this.localSave(tasks);
        taskTitle.value= '';
        taskDesc.value= '';
        };
   this.removeTask=function(indx){
    var tasks=JSON.parse(localStorage.getItem('lists'));
       tasks.splice(indx,1);
       this.localSave(tasks);
       this.renderLists();
   };
   this.markTask=function(indx){
    var tasks=JSON.parse(localStorage.getItem('lists'));
        tasks[indx].done='done';
       this.localSave(tasks);
   };
   this.editTask=function(indx){
    var title=document.getElementById(indx+"edit-title").value;
    var desc=document.getElementById(indx+"edit-desc").value;   
    var tasks=JSON.parse(localStorage.getItem('lists'));
    tasks[indx].title=title;
    tasks[indx].description=desc;
    this.localSave(tasks);
};
   this.localSave=function(obj){
        localStorage.setItem('lists',JSON.stringify(obj));
        this.renderList();
   };

   this.renderList= function(){
       var container= document.getElementById('todo');
       var list=document.createElement('ul');
       var tasks=JSON.parse(localStorage.getItem('lists'));
       var i;
       var template='';
        container.innerHTML="";
       for(i=0; i< tasks.length; i++){
            template+= '<li><h4 class="task--title '+tasks[i].done+'">'+tasks[i].title+'</h4>\
                              <p class="task--desc '+tasks[i].done+'">'+tasks[i].description+'</p>\
                              <div class="hide task--action__edit__'+i+'">\
                                    <input type="text" id="'+i+'edit-title" placeholder="Edit title">\
                                    <textarea name="desc" id="'+i+'edit-desc" cols="30" rows="3 placeholder="Edit task"></textarea>\
                                    <a href="#"data-index="'+i+'" onclick="theList.editTask(this.dataset.index)""><i class="fas fa-plus-circle"></i>save</a>\
                                </div>\
                                <div class="task--actions___'+i+'">\
                                  <a href="#" class="task--actions__mark" data-index="'+i+'" onclick="theList.markTask(this.dataset.index)"><i class="fas fa-check-circle"></i>Mark as done</a>\
                                  <a href="#" class="task--actions__edit"  data-index="'+i+'" ><i class="fas fa-minus-circle"></i>Edit</a>\
                                  <a href="#" class="task--actions__delete"  data-index="'+i+'" onclick="theList.removeTask(this.dataset.index)"><i class="fas fa-minus-circle"></i>Delete</a>\
                               </div></li>';
    
            
      }
      list.innerHTML=template;
      container.appendChild(list);
   };

}
var theList= new List;
theList.renderList();


/* 
started on list manager object
function ListManager(){
         if(localStorage.getItem('lists')){
            this.Lists=JSON.parse(localStorage.getItem('lists'))
         }else{
           this.Lists= Object();     
         }
         var Lists=this.Lists;
         var lizts
        this.addList= function(){
            var name=document.getElementById('listTitle').value;
            var list= new List();
            var id= name.split(" ").join("-");
            list.listTitle=name; 
            list.listId=id;
            Lists[id]= list;
            this.localSave(Lists);
        };
        this.removeList= function(id){
            delete Lists[id];
            this.localSave(Lists);
        };
        this.copyList= function(obj){
            var Lists=JSON.parse(localStorage.getItem('lists'));
            if (obj instanceof Object) {
                Copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
                }
                Copy.id =Copy.id+'-'+Object.keys(Lists).length;
                Lists[Copy.id]=Copy;
                this.localSave(Lists);
            }
        
        };
        this.localSave=function(obj){
            localStorage.setItem('lists',JSON.stringify(obj));
            this.renderLists();
        }
        this.renderLists =function(){
            var lists=JSON.parse(localStorage.getItem('lists'));
            var container= document.getElementById('testList');
            var template='';
            for(var prop in lists){
           template+='<div class="list"><h3>'+lists[prop].listTitle+'</h3>\
            <div class="task--action__add">\
                <input type="text" id="'+lists[prop].listId+'__title" placeholder="Add a title">\
                <textarea name="desc" id="'+lists[prop].listId+'__desc" cols="30" rows="3">Add a description</textarea>\
                <a href="#" onclick="theList.addTask()"><i class="fas fa-plus-circle"></i>Add task</a>\
            </div>';
            template+= lists[prop].renderList();
            template+='<div class="list--actions">\
                <a href="#" class="list--actions__copy" onclick="theLists.copyList('+lists[prop].listId+')"><i class="fas fa-copy"></i>Copy</a>\
                <a href="#" class="list--actions__save" onclick="onclick="theLists.removeList('+lists[prop].listId+')"><i class="fas fa-save"></i>Save</a>\
                <a href="#" class="list--actions__delete" onclick="+theLists.removeList(l'+lists[prop].listId+')"><i class="fas fa-minus-circle"></i>Delete</a></a>\
            </div>\
            </div>';
                
            }
            container.innerHTML=template;
        };
}
theList=new List();
theLists=new ListManager();
theLists.renderLists;
 */
/* TODO:
-Add storage array as a global variable
-flesh out all funtions
-think through user experience
-style everything
-think of ways to use header and footer;
-go through everything and send link before tomorrow. */