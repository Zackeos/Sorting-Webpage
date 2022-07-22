//BUBBLE SORT

export default function bubblesort(temp, initial){
  let heights = [...temp]
  let animations = []
  for (let x=0; x<heights.length; x++){
    for (let y=0; y<heights.length-x-1; y++){
      if (heights[y] > heights[y+1]){
        let tempa = heights[y]
        let tempb = heights[y+1]
        animations.push([initial[heights[y]], initial[heights[y+1]]])
        heights[y] = tempb
        heights[y+1] = tempa
      }
    }
  }
  return animations
}