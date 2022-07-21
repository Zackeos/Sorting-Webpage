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

function switchScreen(){
  toggle("Bubblepage")
  toggle("Insertionpage")
}



//BUBBLE SORT
//generate 10 random heights in an array
heights = []
for (let x=0; x<10; x++){
  while (true){
    a = Math.floor(Math.random() * 12) + 1
    if (!(heights.includes(a))){
      break
    }
  }
  heights.push(a)
}

//initial will be used to identify bars using their heights
var initial = {};
for (let i = 0; i < heights.length; i++){
  initial[heights[i]] = i
}

//create shallow copy as heights will be changing
temp = [...heights]
bubbleanimations = []

//used to check if an array is in order
function inOrder(vals) {
  for(let i = 0; i < vals.length-1; i++){
    if(vals[i]<vals[i+1]){
      return false
    }
  }
  return true
}

//run until list is sorted
while (!(inOrder(heights))){
  for (let x = 0; x<heights.length-1; x++){
    let a = heights[x]
    let b = heights[x+1]
    if (a<b){
      //a swap is made and recorded to the bubbleanimations array
      bubbleanimations.push([initial[a],initial[b]])
      heights[x] = b
      heights[x+1] = a
    }
  }
}

//reset heights for drawing of graph
heights = temp

//initialise vue app
var bubble = new Vue({
  el: "#bubble",
  data() {
  	// store the info about the bars
    return {
      bars: [
        { h: heights[0], offset:0, color:"green", opacity:0.5},
        { h: heights[1], offset:0, color:"red", opacity:0.5},
        { h: heights[2], offset:0, color:"blue", opacity:0.5},
        { h: heights[3], offset:0, color:"orange", opacity:0.5},
        { h: heights[4], offset:0, color:"gray", opacity:0.5},
        { h: heights[5], offset:0, color:"yellow", opacity:0.5},
        { h: heights[6], offset:0, color:"#3fb4d4", opacity:0.5},
        { h: heights[7], offset:0, color:"#21c912", opacity:0.5},
        { h: heights[8], offset:0, color:"#fc3ad6", opacity:0.5},
        { h: heights[9], offset:0, color:"#affc3a", opacity:0.5}
      ],
      count: 0
    }
  },
  methods: {
    finish: function(){
      const allbars = document.getElementsByClassName("bar")
      for (let x = 0; x<allbars.length; x++){
        allbars[x].style.transition = "0.05s";
      }
      var fullsolve = setInterval(() => {
        if (this.count == bubbleanimations.length){
          clearInterval(fullsolve)
          for (let x = 0; x<allbars.length; x++){
            allbars[x].style.transition = "1s";
          }
        }
        this.bars[bubbleanimations[this.count][0]].opacity = 1
        this.bars[bubbleanimations[this.count][1]].opacity = 1
        setTimeout(() => {
          this.bars[bubbleanimations[this.count][0]].offset += 1
          this.bars[bubbleanimations[this.count][1]].offset -= 1
        }, 50);
        setTimeout(() => {
          this.bars[bubbleanimations[this.count][0]].opacity = 0.5
          this.bars[bubbleanimations[this.count][1]].opacity = 0.5
          this.count++
        }, 100);
      }, 150);
    },
    //perform next animation in bubbleanimations
  	next: function(){
      const buttons = document.getElementsByClassName("button")
      for (let button=0; button<buttons.length; button++){
        buttons[button].disabled = true
      }

      if (this.count < bubbleanimations.length) {
        this.bars[bubbleanimations[this.count][0]].opacity = 1
        this.bars[bubbleanimations[this.count][1]].opacity = 1
        setTimeout(() => {
          this.bars[bubbleanimations[this.count][0]].offset += 1
          this.bars[bubbleanimations[this.count][1]].offset -= 1
        }, 1000);
        setTimeout(() => {
          this.bars[bubbleanimations[this.count][0]].opacity = 0.5
          this.bars[bubbleanimations[this.count][1]].opacity = 0.5
          this.count++
        }, 2000);
      }
      setTimeout(() => {
        for (let button=0; button<buttons.length; button++){
          buttons[button].disabled = false
        }
      }, 2001);
    },
    //undo last animation
    previous: function(){
      if (this.count > 0){
        this.count -= 1
        this.bars[bubbleanimations[this.count][0]].offset -= 1
        this.bars[bubbleanimations[this.count][1]].offset += 1
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
        left: 60*(i + bar.offset) + "px",
        height: (bar.h * 20) + "px"
      
      } 
    }
  }
})

//INSERTION SORT
temp = [...heights]
insertionanimations = []

//loop through from first item
for (let x=1; x<heights.length; x++){
  currentvalue = heights[x]
  currentpos = x
  //for each item, pull it back until it is either at the start or it is smaller than bar before it
  while(currentpos>0 && heights[currentpos-1]<currentvalue){
    //add swap to animations array
    insertionanimations.push([initial[heights[currentpos-1]],initial[heights[currentpos]]])
    heights[currentpos] = heights[currentpos-1]
    currentpos=currentpos-1
  heights[currentpos] = currentvalue
  }
}

heights=temp


var insertion = new Vue({
  el: "#insertion",
  data() {
  	// store the info about the bars
    return {
      bars: [
        { h: heights[0], offset:0, color:"green", opacity:0.5},
        { h: heights[1], offset:0, color:"red", opacity:0.5},
        { h: heights[2], offset:0, color:"blue", opacity:0.5},
        { h: heights[3], offset:0, color:"orange", opacity:0.5},
        { h: heights[4], offset:0, color:"gray", opacity:0.5},
        { h: heights[5], offset:0, color:"yellow", opacity:0.5},
        { h: heights[6], offset:0,color:"#3fb4d4", opacity:0.5},
        { h: heights[7], offset:0,color:"#21c912", opacity:0.5},
        { h: heights[8], offset:0,color:"#fc3ad6", opacity:0.5},
          { h: heights[9], offset:0,color:"#affc3a", opacity:0.5}
      ],
      count: 0
    }
  },
  methods: {
    finish: function(){
      const allbars = document.getElementsByClassName("bar")
      for (let x = 0; x<allbars.length; x++){
        allbars[x].style.transition = "0.05s";
      }
      var fullsolve = setInterval(() => {
        if (this.count == insertionanimations.length){
          clearInterval(fullsolve)
          for (let x = 0; x<allbars.length; x++){
            allbars[x].style.transition = "1s";
          }
        }
        this.bars[insertionanimations[this.count][0]].opacity = 1
        this.bars[insertionanimations[this.count][1]].opacity = 1
        setTimeout(() => {
          this.bars[insertionanimations[this.count][0]].offset += 1
          this.bars[insertionanimations[this.count][1]].offset -= 1
        }, 50);
        setTimeout(() => {
          this.bars[insertionanimations[this.count][0]].opacity = 0.5
          this.bars[insertionanimations[this.count][1]].opacity = 0.5
          this.count++
        }, 100);
      }, 150);
    },
  	next: function(){
      const buttons = document.getElementsByClassName("button")
      for (let button=0; button<buttons.length; button++){
        buttons[button].disabled = true
      }

      if (this.count < insertionanimations.length) {
        this.bars[insertionanimations[this.count][0]].opacity = 1
        this.bars[insertionanimations[this.count][1]].opacity = 1
        setTimeout(() => {
          this.bars[insertionanimations[this.count][0]].offset += 1
          this.bars[insertionanimations[this.count][1]].offset -= 1
        }, 1000);
        setTimeout(() => {
          this.bars[insertionanimations[this.count][0]].opacity = 0.5
          this.bars[insertionanimations[this.count][1]].opacity = 0.5
          this.count++
        }, 2000);
      }
      setTimeout(() => {
        for (let button=0; button<buttons.length; button++){
          buttons[button].disabled = false
        }
      }, 2001);
    },
    previous: function(){
      if (this.count > 0){
        this.count -= 1
        this.bars[insertionanimations[this.count][0]].offset -= 1
        this.bars[insertionanimations[this.count][1]].offset += 1
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
        left: 60*(i + bar.offset) + "px",
        height: (bar.h * 20) + "px"
      
      } 
    }
  }
})