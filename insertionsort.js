//INSERTION SORT


export function insertionsort(heights, initial) {
  animations = []
  for (let x=1; x<heights.length; x++){
    currentvalue = heights[x]
    currentpos = x
    //for each item, pull it back until it is either at the start or it is smaller than bar before it
    let n = 0;
    while(currentpos>0 && heights[currentpos-1]<currentvalue){
      //add swap to animations array
      animations.push([initial[heights[currentpos-1]],initial[heights[currentpos]]])
      heights[currentpos] = heights[currentpos-1]
      currentpos=currentpos-1
    heights[currentpos] = currentvalue
    }
  }
  return animations
}