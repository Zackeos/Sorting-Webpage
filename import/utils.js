//Functions to toggle the showing of bubble/insertion sort
function toggle(id){
  var x = document.getElementById(id)
  if(x.classList.contains("hide")){
    x.classList.remove("hide")
  }
  else{
    x.classList.add("hide")
  }
}
const switchScreen = function(){
  toggle("Bubblepage")
  toggle("Insertionpage")
}
