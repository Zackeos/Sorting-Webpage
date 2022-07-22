//SELECTION SORT
export default function selectionsort(temp, initial){
  let heights = [...temp]
  let animations = []
  for (let x=0; x<heights.length; x++){
    let maxpos = x
    for (let y=x+1; y<heights.length; y++){
      if(heights[maxpos] > heights[y]){
        maxpos = y
      }
    }
    let tempa = heights[x]
    let tempb = heights[maxpos]
    animations.push([initial[heights[x]], initial[heights[maxpos]]])
    heights[x] = tempb
    heights[maxpos] = tempa
  }
  return animations
}