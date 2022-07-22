//GNOME SORT
export default function gnomesort(temp, initial){
  let heights = [...temp]
  let animations = []
  let count = 0
  while (count < heights.length){
    if (count == 0){
      count++
    }
    if (heights[count] >= heights[count-1]){
      count++
    }else{
      let tempa = heights[count]
      let tempb = heights[count-1]
      animations.push([initial[heights[count]], initial[heights[count-1]]])
      heights[count] = tempb
      heights[count-1] = tempa
      count = count -1
    }
  }
  console.log(heights)
  return animations
}