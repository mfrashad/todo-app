$(document).ready(function(){
  $("#addForm").submit(addButtonHandler);
  $("#taskList .close").click(removeTask);
  $("#taskList .list-group-item").click(finishTask);
  initialize();
});

function initialize(){
  $("taskList").empty();
  $.get('/api/getTasks',function(data,status){
    var tasks = JSON.parse(data);
    tasks.forEach(function(val){
      addTask(val.task);
    });
  });

  initializeUser();
}

function initializeUser(){
  $.get('/api/getUser',function(user,status){
    if(user){
      console.log('got user');
      $("#loginButton").text('Logout');
      $("#loginButton").parent().attr('href','/auth/google/logout');
      $("#loginButton").parent().before('<img src="'+user.image+'">');
      //$("#loginButton").parent().before('<h6>Hello, '+user.displayName.split(' ')[0]+'</h6>');
    }
  })
}

function addButtonHandler(event){
  event.preventDefault();
  var text = $("#inputTask").val();
  addTask(text);
  
}

function addTask(text){
  
  if(text==="" || !text){
    return;
  }
  var element = "";
  element += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">';
  element += '<div class="d-flex w-100 justify-content-between">';
  element += '<h5 class="mb-1 task-text"><span>'+text+'</span></h5>';
  element += '<button class="close">&times;</button>';
  element += '</div>';
  element += '</a>';
  element = $(element);
  $("#taskList").append(element);
  $("#inputTask").val("");
  console.log(text);
  $("#taskList .close").click(removeTask);
  $(element).click(finishTask);
  $.post('/api/addTask',{task:text,finished:false});

};

function removeTask(){
  var text = $(this).prev().text();
  $.post('/api/removeTask',{task:text});
  $(this).parent().parent().remove();
};

function finishTask(){
  $(this).toggleClass("finished-task");
}
