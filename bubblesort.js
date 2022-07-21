//BUBBLE SORT


//used to check if an array is in order
export function inOrder(vals) {
  for(let i = 0; i < vals.length-1; i++){
    if(vals[i]<vals[i+1]){
      return false
    }
  }
  return true
}

export function bubblesort(heights, initial) {
  animations = []
  while (!(inOrder(heights))){
    for (let x = 0; x<heights.length-1; x++){
      let a = heights[x]
      let b = heights[x+1]
      if (a<b){
        //a swap is made and recorded to the bubbleanimations array
        animations.push([initial[a],initial[b]])
        heights[x] = b
        heights[x+1] = a
      }
    }
  }
  return animations
}
