const bubble_1 = (arr)=>{
  for(let i=0; i<=arr.length-2; i++){
    for(let j=i+1; j<=arr.length-1; j++){
      let temp;
      if(arr[i]<arr[j]){
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
// 或 j = len - 1 - i
/**
 * 内循环相邻元素比较，并交换
 */
const bubble = (arr)=>{
  let len = arr.length-1;
  for(let i=0; i <= len; i++){
    for(let j=0; j <= len-i; j++){
      let temp;
      if(arr[j+1]<arr[j]){
        temp = arr[i];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}
/**
 * 1. 挑基准
 * 2. 与基准比较，比其小，放前面，否则放后面----分区
 */
const quick = (arr) => {
  arr = quickSort(arr, 0, arr.length-1);
  return arr;
}
const quickSort = (arr, start, end)=>{
  if(start < end && end>0 && start + 1< end){
    console.log(start, end);
    let pos = partition(arr, start, end);
    console.log(pos);
    if( pos > 0 ){
      quickSort(arr, start, pos-1);
      quickSort(arr, pos+1, end);
    }
  }
  return arr;
}
const partition = (arr, start, end)=>{
  let basis = arr[end];
  let index = start - 1;
  for(let i = start; i<end-1; i++){
    console.log(basis, arr[i])
    if(arr[i] < basis){
      index += 1;
      temp = arr[index];
      arr[index] = arr[i];
      arr[i] = temp;
    }
  }
  temp = arr[index + 1];
  arr[index + 1] = arr[end]; // 把基准放中间位置
  arr[end] = temp;
  return index;
}
/**
 * 在已排序序列中·从后向前·扫描，找到相应位置并插入；是gap为1的shell排序
 * 1. 认为第一个元素已被排序
 * 2. 下一个元素从后向前扫描
 * 3. 如果已排序元素大于新元素，将该元素移到下一位置；直到遇到小于或等于新元素的位置
 * 4. 新元素插入后，再重复向后
 */
const insert = (arr) => {
  let preIndex, current;
  for(let i=1; i<arr.length; i++){
    preIndex = i - 1;
    current = arr[i];
    while(preIndex>=0 && arr[preIndex]>current){
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}
/**
 * 缩小增量排序：优先比较距离较近的元素，参考数据本身的特性
 * 1. 将其分成若干个子序列分别直接插入排序；gap = length/2 ; [0, gap] [1, gap + 1]...
 */
const shell = (arr) => {
  for(let gap = Math.floor(arr.length/2); gap > 0; gap /= 2){
    for(let i = gap; i < arr.length; i++){
      let j = i;
      while(j-gap >=0 && arr[j] < arr[j-gap]){
        j -= gap;
      }
    }
  }
}

const select = () => {

}

const heap = () => {

}
/**
 * 非比较类排序：
 * 计数：将输入的数值转化为Key存储起来；要求数据必须是有确定范围的整数
 * 找出待排序数组中的最大和最小的元素
 * 统计数组中每个值为i出现的次数，存入数组c的第i项
 * 对所有计数累加
 * 反向填充目标数组
 * 基数：将整数按位数切割成不同的数字，然后按每个位数分别比较
 * 桶
 */
