//settings
let numofbars = 20
let transparency = 0.35

//generate random array of colours
randomColor = function(){
  return "#"+Math.floor(Math.random()*16777215).toString(16);
}
colours = []
for (let x=0; x<numofbars; x++){
  colours.push(randomColor())
}


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
