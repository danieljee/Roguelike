export default (target, min, max) => {
  if (target > max){
    return max;
  } else if (target < min){
    return min;
  }
  return target;
}
