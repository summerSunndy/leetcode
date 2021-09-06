const adjustQuick = (arr)=>{
  quick(arr, 0, arr.length-1);
}
const quick = (arr, start, end) =>{
  const basis = arr[end];
  let i = start - 1;
  let temp;
  for(let j = start; j<end-1; j++){
    if(arr[j]>=basis){
      i++;
      temp = arr[j];
      arr[j]=arr[i];
      arr[i]=arr[j];
    }
  }
  return i+1;
}
