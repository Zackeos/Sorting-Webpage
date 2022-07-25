import bubblesort from "./bubblesort.js"
import insertionsort from "./insertionsort.js"
//settings
let numofbars = 20
let transparency = 0.35
// let size = 30

// let colours = ["green", "red", "blue", "orange", "gray", "yellow", "#3fb4d4", "#21c912", "#fc3ad6", "#affc3a"]

//calculate size of bars to fit screen
let currentSize = document.getElementById("bubble").clientWidth
let size = currentSize/numofbars
//set widths of bars
const all = document.getElementsByClassName("bar")
for (let x=0; x<all.length; x++){
  all[x].style.width = (size-4)+"px";
}

//generate random array of colours
const randomColor = function(){
  return "#"+Math.floor(Math.random()*16777215).toString(16);
}
let colours = []
for (let x=0; x<numofbars; x++){
  colours.push(randomColor())
}


let toggleButtons = function(){
  const buttons = document.getElementsByClassName("button")
  if (buttons[0].disabled){
    for (let button=0; button<buttons.length; button++){
      buttons[button].disabled = false
    }
  }else{
    for (let button=0; button<buttons.length; button++){
      buttons[button].disabled = true
    }
  }
    

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
  right(amount){
    this.offset += amount
  }
  left(amount){
    this.offset -= amount
  }
}

//array shuffle function from stack overflow
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}


//generate random heights in an array
let heights = []
for (let x=1; x<numofbars+1; x++){
  heights.push(x)
}
shuffleArray(heights)


//initial will be used to identify bars using their heights
let initial = {};
for (let i = 0; i < heights.length; i++){
  initial[heights[i]] = i
}

//create shallow copy as heights will be changing
let temp = [...heights]



let bubbleanimations = bubblesort(heights, initial)

//reset heights for drawing of graph
heights = temp

//initialise vue app
var bubble = new Vue({
  el: "#bubble",
  data() {
  	// get the info about the bars
    let barslist = []
    for (let x=0; x<numofbars; x++){
      let y = new bar(heights[x],colours[x])
      barslist.push(y)
    }
    return {
      bars: barslist,
      count: 0
    }
  },
  methods: {
    //function to go through all steps in animation list very fast
    finish: function(){
      if (this.count == bubbleanimations.length){}
      else{
        //disable all buttons while function is running
        toggleButtons()
        //speed up transition time for bars
        const allbars = document.getElementsByClassName("bar")
        for (let x = 0; x<allbars.length; x++){
          allbars[x].style.transition = "0.05s";
        }
        //run each animation in turn (150ms per)
        var fullsolve = setInterval(() => {

          this.bars[bubbleanimations[this.count][0]].dark()
          this.bars[bubbleanimations[this.count][1]].dark()
          setTimeout(() => {
            this.bars[bubbleanimations[this.count][0]].right(1)
            this.bars[bubbleanimations[this.count][1]].left(1)
          }, 50);
          setTimeout(() => {
            this.bars[bubbleanimations[this.count][0]].light()
            this.bars[bubbleanimations[this.count][1]].light()
            this.count++
          }, 100);
          //check if finished
          if (this.count == bubbleanimations.length-1){
            clearInterval(fullsolve)
            //when finished, reset transition time and re-enable buttons
            for (let x = 0; x<allbars.length; x++){
              allbars[x].style.transition = "1s";
            }
            toggleButtons()
          }
        }, 150);
      }
      
    },
    //perform next animation in bubbleanimations
  	next: function(){
      if (this.count == bubbleanimations.length){}
      else{
        //disable buttons during animation
        const buttons = document.getElementsByClassName("button")
        toggleButtons()

        if (this.count < bubbleanimations.length) {
          this.bars[bubbleanimations[this.count][0]].dark()
          this.bars[bubbleanimations[this.count][1]].dark()
          setTimeout(() => {
            this.bars[bubbleanimations[this.count][0]].right(1)
            this.bars[bubbleanimations[this.count][1]].left(1)
          }, 1000);
          setTimeout(() => {
            this.bars[bubbleanimations[this.count][0]].light()
            this.bars[bubbleanimations[this.count][1]].light()
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
        this.bars[bubbleanimations[this.count][0]].left(1)
        this.bars[bubbleanimations[this.count][1]].right(1)
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



temp = [...heights]


let insertionanimations = insertionsort(heights, initial)
heights=temp


var insertion = new Vue({
  el: "#insertion",
  data() {
  	// store the info about the bars
    let barslist = []
    for (let x=0; x<numofbars; x++){
      let thing = new bar(heights[x],colours[x])
      barslist.push(thing)
    }
    return {
      bars: barslist,
      count: 0
    }
  },
  methods: {
    finish: function(){
      if (this.count == insertionanimations.length){}
      else{
        //disable all buttons while function is running
        toggleButtons()
        //speed up transition time for all bars
        const allbars = document.getElementsByClassName("bar")
        for (let x = 0; x<allbars.length; x++){
          allbars[x].style.transition = "0.05s";
        }
        //run each animation in turn (150ms per)
        var fullsolve = setInterval(() => {
          this.bars[insertionanimations[this.count][0]].dark()
          this.bars[insertionanimations[this.count][1]].dark()
          setTimeout(() => {
            this.bars[insertionanimations[this.count][0]].right(1)
            this.bars[insertionanimations[this.count][1]].left(1)
          }, 50);
          setTimeout(() => {
            this.bars[insertionanimations[this.count][0]].light()
            this.bars[insertionanimations[this.count][1]].light()
            this.count++
          }, 100);
          //check if finished
          if (this.count == insertionanimations.length-1){
            clearInterval(fullsolve)
            //when finished, reset transition time and re-enable buttons
            for (let x = 0; x<allbars.length; x++){
              allbars[x].style.transition = "1s";
            }
            toggleButtons()
          }
        }, 150);
      }
    },
  	next: function(){
      if (this.count == bubbleanimations.length){}
      else{
        toggleButtons()
        if (this.count < insertionanimations.length) {
          this.bars[insertionanimations[this.count][0]].dark()
          this.bars[insertionanimations[this.count][1]].dark()
          setTimeout(() => {
            this.bars[insertionanimations[this.count][0]].right(1)
            this.bars[insertionanimations[this.count][1]].left(1)
          }, 1000);
          setTimeout(() => {
            this.bars[insertionanimations[this.count][0]].light()
            this.bars[insertionanimations[this.count][1]].light()
            this.count++
          }, 2000);
        }
        setTimeout(() => {
          toggleButtons()
        }, 2001);
      }
    },
    previous: function(){
      if (this.count > 0){
        this.count -= 1
        this.bars[insertionanimations[this.count][0]].left(1)
        this.bars[insertionanimations[this.count][1]].right(1)
      }
    },
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


// import InsertionSortAlgorithm from "./insert";
// import BubSortAlgorithm from "./insert";
// import Select

// new Vue({

//   title:
//   blurb:
//   algorithms :[{title:"Insertion Sort", code:InsertionSortAlgorithm}, {title,code:}]
//   selectedAlgorithm:
// })