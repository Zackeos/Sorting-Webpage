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
temp = [...heights]
console.log(heights)
animations = []
var initial = {};
for (let i = 0; i < heights.length; i++){
  initial[heights[i]] = i
}
function inOrder(vals) {
  for(let i = 0; i < vals.length-1; i++){
    if(vals[i]<vals[i+1]){
      return false
    }
  }
  return true
}

while (!(inOrder(heights))){
  for (let x = 0; x<heights.length-1; x++){
    let a = heights[x]
    let b = heights[x+1]
    if (a<b){
      animations.push([initial[a],initial[b]])
      heights[x] = b
      heights[x+1] = a
    }
  }
}
console.log(animations)
heights = temp
var app = new Vue({
  el: "#app",
  data() {
  	// store the info about the bars
    return {
      bars: [
        { h: heights[0], offset:0, color:"green"},
        { h: heights[1], offset:0, color:"red"},
        { h: heights[2], offset:0, color:"blue"},
        { h: heights[3], offset:0, color:"orange"},
        { h: heights[4], offset:0, color:"gray"},
        { h: heights[5], offset:0, color:"yellow"},
        { h: heights[6], offset:0,color:"#3fb4d4" },
        { h: heights[7], offset:0,color:"#21c912" },
        { h: heights[8], offset:0,color:"#fc3ad6" },
          { h: heights[9], offset:0,color:"#affc3a" }
      ],
      count: 0
    }
  },
  methods: {
  	next: function(){
      if (this.count < animations.length) {
      this.bars[animations[this.count][0]].offset += 1
      this.bars[animations[this.count][1]].offset -= 1
      this.count++
      }
    },
    previous: function(){
      if (this.count > 0){
        this.count -= 1
        this.bars[animations[this.count][0]].offset -= 1
        this.bars[animations[this.count][1]].offset += 1
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
      	background:bar.color,
        left: 60*(i + bar.offset) + "px",
        height: (bar.h * 20) + "px"
      
      } 
    }
  }
})