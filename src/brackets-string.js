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
