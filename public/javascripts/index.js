$(document).ready(function(){
  $("#addButton").click(addTask);
  $("#taskList .close").click(removeTask);
  $("#taskList .list-group-item").click(finishTask);
});

function addTask(){
  var text = $("#inputTask").val();
  if(text===""){
    return;
  }
  var element = "";
  element += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">';
  element += '<div class="d-flex w-100 justify-content-between">';
  element += '<h5 class="mb-1 task-text">'+text+'</h5>';
  element += '<button class="close">&times;</button>';
  element += '</div>';
  element += '</a>';
  element = $(element);
  $("#taskList").append(element);
  $("#inputTask").val("");
  console.log(text);
  $("#taskList .close").click(removeTask);
  $(element).click(finishTask);
};

function removeTask(){
  $(this).parent().parent().remove();
};

function finishTask(){
  $(this).toggleClass("finished-task");
}
