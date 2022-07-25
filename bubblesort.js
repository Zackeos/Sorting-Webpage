//BUBBLE SORT

// export default function bubblesort(temp, initial){
//   let comparisons = 0
//   let heights = [...temp]
//   let animations = []
//   for (let x=0; x<heights.length; x++){
//     for (let y=0; y<heights.length-x-1; y++){
//       comparisons++
//       if (heights[y] > heights[y+1]){
//         let tempa = heights[y]
//         let tempb = heights[y+1]
//         animations.push([initial[heights[y]], initial[heights[y+1]]])
//         heights[y] = tempb
//         heights[y+1] = tempa
//       }
//     }
//   }
//   return [animations, comparisons]
// }

const inOrder = function(vals){
  for(let i = 0; i < vals.length-1; i++){
    if(vals[i]<vals[i+1]){
      return false
    }
  }
  return true
}

export default function bubblesort(temp, initial){
  let heights = [...temp]
  let animations = []
  let comparisons= 0
  while (!(inOrder(heights))){
    for (let x = 0; x<heights.length-1; x++){
      comparisons++
      let a = heights[x]
      let b = heights[x+1]
      if (a<b){
        animations.push([initial[a],initial[b]])
        heights[x] = b
        heights[x+1] = a
      }
    }
  }
  return [animations, comparisons]
}
