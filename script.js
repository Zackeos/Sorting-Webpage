import bubblesort from "./bubblesort.js"
import insertionsort from "./insertionsort.js"
import selectionsort from "./selectionsort.js"
import gnomesort from "./gnomesort.js"

let numofbars = 21
let transparency = 0.35

let currentSize = document.getElementById("sorthalf").clientWidth
let size = currentSize/numofbars

const all = document.getElementsByClassName("bar")
for (let x=0; x<all.length; x++){
  all[x].style.width = (size-4)+"px";
}



class bar{
  constructor(height, color){
    this.h=height
    this.color=color
    this.offset=0
    this.opacity=transparency
  }
  light(){
    this.opacity=transparency
  }
  dark(){
    this.opacity=1
  }
}

//CREATING ARRAY OF HEIGHTS

//array shuffle function from stack overflow
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}
let heights = []
for (let x=1; x<numofbars+1; x++){
  heights.push(x)
}
shuffleArray(heights)
let shortest = heights.indexOf(1)
console.log(shortest)
//initial will be used to identify bars using their heights
let initial = {};
for (let i = 0; i < heights.length; i++){
  initial[heights[i]] = i
}







//initialise vue app
var app = new Vue({
  el: "#app",
  data() {
  	// get the info about the bars
    let bubbleanimations = bubblesort(heights, initial)
    let insertionanimations = insertionsort(heights, initial)
    let selectionanimations = selectionsort(heights, initial)
    let gnomeanimations = gnomesort(heights, initial)
    const randomColor = function(){
      return "#"+Math.floor(Math.random()*16777215).toString(16);
    }
    let barslist = []
    for (let x=0; x<numofbars; x++){
      let y = new bar(heights[x],randomColor())
      barslist.push(y)
    }
    return {
      short: shortest,
      initial: initial,
      currentSize: currentSize,
      finnumofbars: numofbars,
      titles: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Gnome Sort"],
      bars: barslist,
      count: 0,
      animations: [bubbleanimations, insertionanimations, selectionanimations, gnomeanimations],
      currentscreen: 0
    }
  },
  methods: {
    toggleButtons: function(){
      let buttons = document.getElementsByClassName("button")
      if (buttons[0].disabled){
        for (let button=0; button<buttons.length; button++){
          buttons[button].disabled = false
        }
      }else{
        for (let button=0; button<buttons.length; button++){
          buttons[button].disabled = true
        }
      }   
    },
    swapbars: function(a,b,heights){
      let positiona = a.offset + heights.indexOf(a.h)
      let positionb = b.offset + heights.indexOf(b.h)
      let movement = positionb-positiona
      a.offset += movement
      b.offset -= movement
    },
    switchscreen: function(){
      this.reset()
      if (this.currentscreen<this.animations.length-1){
        this.currentscreen++
      }else{
        this.currentscreen = 0
      }
    },
    //function to go through all steps in animation list very fast
    finish: function(){
      console.log(this.count)
      console.log(this.animations[this.currentscreen].length)
      if (this.count == this.animations[this.currentscreen].length){
        //pass
      }
      else{
        //disable all buttons while function is running
        this.toggleButtons()
        //speed up transition time for bars
        const allbars = document.getElementsByClassName("bar")
        for (let x = 0; x<allbars.length; x++){
          allbars[x].style.transition = "0.05s";
        }
        //run each animation in turn (150ms per)
        var fullsolve = setInterval(() => {

          this.bars[this.animations[this.currentscreen][this.count][0]].dark()
          this.bars[this.animations[this.currentscreen][this.count][1]].dark()
          setTimeout(() => {
            this.swapbars(this.bars[this.animations[this.currentscreen][this.count][0]],this.bars[this.animations[this.currentscreen][this.count][1]], heights)
          }, 50);
          setTimeout(() => {
            this.bars[this.animations[this.currentscreen][this.count][0]].light()
            this.bars[this.animations[this.currentscreen][this.count][1]].light()
            this.count++
          }, 100);
          //check if finished
          if (this.count == this.animations[this.currentscreen].length-1){
            clearInterval(fullsolve)
            //when finished, reset transition time and re-enable buttons
            for (let x = 0; x<allbars.length; x++){
              allbars[x].style.transition = "1s";
            }
            this.toggleButtons()
          }
        }, 150);
      }
      
    },
    //perform next animation in this.animations[this.currentscreen]
  	next: function(){
      if (this.count == this.animations[this.currentscreen].length){}
      else{
        //disable buttons during animation
        const buttons = document.getElementsByClassName("button")
        this.toggleButtons()

        if (this.count < this.animations[this.currentscreen].length) {
          this.bars[this.animations[this.currentscreen][this.count][0]].dark()
          this.bars[this.animations[this.currentscreen][this.count][1]].dark()
          setTimeout(() => {
            this.swapbars(this.bars[this.animations[this.currentscreen][this.count][0]],this.bars[this.animations[this.currentscreen][this.count][1]], heights)
          }, 1000);
          setTimeout(() => {
            this.bars[this.animations[this.currentscreen][this.count][0]].light()
            this.bars[this.animations[this.currentscreen][this.count][1]].light()
            this.count++
          }, 2000);
        }
        setTimeout(() => {
          toggleButtons()
        }, 2001);
      }
    },
    //undo last animation
    previous: function(){
      if (this.count > 0){
        this.count -= 1
        this.swapbars(this.bars[this.animations[this.currentscreen][this.count][1]],this.bars[this.animations[this.currentscreen][this.count][0]], heights)
      }
    },
    //bring back to original state
    reset: function(){
      this.count = 0
      for (let x = 0; x<this.bars.length; x++) {
        this.bars[x].offset = 0
      }

    },
    getBarStyle: function(i, bar){
    	// figure out where a bar should be positioned. Each one has width 60px
    	return {
        opacity:bar.opacity,
      	background:bar.color,
        left: size*(i + bar.offset) + "px",
        height: (245/numofbars*bar.h) + "px"
      
      } 
    }
  }
})