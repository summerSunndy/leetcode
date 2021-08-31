/**
 * 有效的括号
 * 1. [{()}] 简单多层嵌套
 * 2. []{}() 不嵌套
 * 3. [{[]}][()][]  嵌套与不嵌套都存在，且以不同形式重复
 * 4. ((
 * 5. [} 等都为不合法
 * enter_stack 是括号入栈时，定义其应该出现的出栈元素
 */

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const  len = s.length;
  if(len === 0) return '';
  const isAllSameChar = (char, str)=>{
    const reg = new RegExp(`^${char}+$`)
    return reg.test(str);
  }
  // 所有字符相同
  if(len === 1 || isAllSameChar(s.charAt(0), s)) return s;
  // 所有字符都不同
  const isAllDiff = (str)=>{
    let pos = 0;
    const temp = str.split('').sort().join('');
    while(pos < len){
      const tempReg = new RegExp(`${temp[pos]}+`);
      const result = tempReg.exec(temp);
      if(result && result[0].length === 1){
        pos++;
      }else{
        break;
      }
    }
    return pos === len;
  }
  if(isAllDiff(s)) return s.charAt(0);
  let result = [];
  // start, end是str的计算位置
  const innerFind = (start, end, str) => {
    let currentComputedStr = str.substr(start, end+1);
    let curChar = str[start]
    // index, lastIndex 是当前计算到的子串的位置
    let index = currentComputedStr.indexOf(curChar);
    let lastIndex = currentComputedStr.lastIndexOf(curChar);
    console.log('start compare',currentComputedStr, start, end, index, lastIndex, currentComputedStr[index], currentComputedStr[lastIndex]);
    if(isAllSameChar(curChar, currentComputedStr) && currentComputedStr.length > 1){
      return result.push(currentComputedStr);
    }else if(isAllDiff(currentComputedStr)){
      return result.push(curChar);
    }
    while(index <= lastIndex && currentComputedStr.length > 0){
      //单方向移动，没有相同的字符，向前后移
      if(index === end || lastIndex === -1){
        break;
      }else if(index === lastIndex && index === 0){
        console.log('single char',currentComputedStr);
        innerFind(start + 1, end, currentComputedStr.slice(start + 1, end));
      }else if(
        curChar !== currentComputedStr[end]
        && lastIndex !== end
        && index === 0
      ){
        //单方向移动，没有相同的字符，从向前移
        console.log('single char',currentComputedStr, str[lastIndex], str[index]);
        innerFind(start, lastIndex, currentComputedStr.slice(index, lastIndex + 1));
      }else if(str.length > 1 && isAllSameChar(str.charAt(0), str)){
        console.log('same char',currentComputedStr);
        return result.push(currentComputedStr);
      }else if(
        // 计算到中间位置，结束，更新计算结果
        (index === lastIndex && index !== 0) ||
        (index + 1 === lastIndex && currentComputedStr[index] === currentComputedStr[lastIndex])){
        console.log('push', currentComputedStr);
        return result.push(currentComputedStr);
      }else if(currentComputedStr[index] === currentComputedStr[lastIndex]){
        // 循环过程中，元素相等时，向中间移动
        console.log('continue', currentComputedStr);
        index++;
        lastIndex--;
      }else if(currentComputedStr[index] !== currentComputedStr[lastIndex] && index +1 !== lastIndex){
      // 双方向移动，未到中间就不相等时，进行左右子串及中间未计算部分子串的查找
        console.log('distribute', currentComputedStr);
        innerFind(start, index - 1, currentComputedStr.slice(start, index));
        innerFind(lastIndex + 1, end, currentComputedStr.slice(lastIndex, end));
        innerFind(index, lastIndex + 1, currentComputedStr.slice(index, lastIndex));
        return;
      }else if(index + 1 === lastIndex && currentComputedStr.length>=4){
        // 从前一项与后一项错位求解
        console.log('disturb1', currentComputedStr.slice(start, end - 1));
        innerFind(start, end - 1, currentComputedStr.slice(start, end - 1));
        console.log('disturb2', currentComputedStr.slice(start + 1, end + 1), start, end);
        innerFind(start, end, currentComputedStr.slice(start + 1, end + 1));
        return;
      }
    }
  }
  innerFind(0, len - 1, s);
  console.log('end', result);
  let maxLengthItem = result.length>0 && result[0].length;
  const filterResult = result.filter((item)=>{
    if(item.length > maxLengthItem){
      maxLengthItem = item.length
      return item;
    }
  });
  return filterResult.length===0 ? result[0] : filterResult[0];
};

/**
 * "eabcb"
 * start compare babad 0 5 0 2
 * start compare aacabdkacaa 0 11 0 10
 */
 const isAllDiff = (str)=>{
  let pos = 0;
  const temp = str.split('').sort().join('');
  while(pos < str.length){
    const tempReg = new RegExp(`${temp[pos]}+`);
    const result = tempReg.exec(temp);
    if(result && result[0].length === 1){
      pos++;
    }else{
      break;
    }
  }
  return pos === str.length;
}
const isAllSameChar = (char, str)=>{
  const reg = new RegExp(`^${char}+$`)
  return reg.test(str);
}
const isContra = (str)=>{
  return str === str.split('').reverse().join('');
}
var longestPalindrome = function(s) {
  const  len = s.length;
  if(len === 0) return '';
  // 所有字符相同
  if(len === 1 || isAllSameChar(s.charAt(0), s)) return s;
  // 所有字符都不同
  if(isAllDiff(s)) return s.charAt(0);
  let maxContra = '';
  const computeStr = (start, end, str) => {
    for(let i = start; i< end; i++){
      let index = 0;
      let lastIndex = str.lastIndexOf(str[i]);
      console.log('original',str, lastIndex, str[i], start, end);
      let curStr = str.substr(i, lastIndex+1 - i );
      let innerLastIndex = curStr.lastIndexOf(curStr[index]);
      if(lastIndex !== innerLastIndex){
        lastIndex = innerLastIndex;
      }
      console.log('cur',curStr);
      if(curStr.length > 1 && isContra(curStr)){
        maxContra = maxContra.length > curStr.length ? curStr : maxContra;
        i += curStr.length;
        break;
      }else if(curStr.length > 1 && isAllDiff(curStr)){
        i += curStr.length;
        break;
      }else if(curStr.length === 1){
        continue;
      }
      while(index <= lastIndex){
        console.log(curStr[index], curStr[lastIndex], i, index, lastIndex, end, curStr);
        if(index !== lastIndex && curStr[index] === curStr[lastIndex]){
          console.log('continue', i, index, lastIndex, end, curStr);
          index++;
          lastIndex--;
          continue;
        }else if(curStr.length >= 7 && index !== lastIndex && curStr[index] != curStr[lastIndex]){
          const centerStr = curStr.slice(index, lastIndex+1);
          const leftStr = curStr.slice(i, index);
          const rightStr = curStr.slice(lastIndex+1, end+1);
          let leftPos = -1, rightPos = -1;
          for(let char of leftStr){
            // center中最后与left相同的字符
            if(centerStr.lastIndexOf(char)>-1){
              leftPos = centerStr.lastIndexOf(char);
            }
          }
          for(let char of rightStr){
            // center中最先与left相同的字符
            if(centerStr.indexOf(char)>-1){
              leftPos = centerStr.lastIndexOf(char);
            }
          }
          if(leftPos > -1){
            let leftStart = leftStr.indexOf(centerStr[leftPos]);
            let tempStr = leftStr + centerStr;
            let leftEnd = tempStr.lastIndexOf(centerStr[leftPos])
            let combineStr = tempStr.substr(leftStart, leftEnd - leftStart + 1);
            console.log('split',tempStr, combineStr, leftStart, leftEnd);
            computeStr(0, combineStr.length, combineStr);
          }else{
            computeStr(0, leftStr.length, leftStr);
          }
          if(rightPos > -1){
            let rightEnd = rightStr.lastIndexOf(centerStr[rightPos]);
            let tempStr = centerStr+rightStr;
            let rightStart = tempStr.indexOf(centerStr[rightPos]);
            let combineStr = tempStr.substr(rightStart, rightEnd - rightStart + 1);
            console.log('split',tempStr, combineStr, rightStart, rightEnd);
            computeStr(0, combineStr.length, combineStr);
          }else{
            computeStr(0, rightStr.length, rightStr);
          }
          if(leftPos === -1 && rightPos === -1){
            computeStr(0, centerStr.length, centerStr);
          }
        }
      }
    }
  }
  computeStr(0, len, s);
  return maxContra;
}
