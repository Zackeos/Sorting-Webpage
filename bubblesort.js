//BUBBLE SORT
const inOrder = function(vals){
  for(let i = 0; i < vals.length-1; i++){
    if(vals[i]<vals[i+1]){
      return false
    }
  }
  return true
}


export default function bubblesort(heights, initial){
  let animations = []
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
  return animations
}
// export default BubbleSort;