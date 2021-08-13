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
  // start, end是s的计算位置
  const innerFind = (start, end) => {
      let currentComputedStr = s.substring(start, end);
      let curChar = s[start]
      // index, lastIndex 是当前参与计算子串的位置
      let index = currentComputedStr.indexOf(curChar);
      let lastIndex = currentComputedStr.lastIndexOf(curChar);
      currentComputedStr = currentComputedStr.substr(index, lastIndex + 1);
      if(isAllSameChar(curChar, currentComputedStr) && currentComputedStr.length > 1){
        return result.push(currentComputedStr);
      }else if(isAllDiff(currentComputedStr)){
          return result.push(curChar);
      }
      console.log('start compare',currentComputedStr, start, end, index, lastIndex, currentComputedStr[index], currentComputedStr[lastIndex]);
      while(index <= lastIndex && index >= 0){
          // 没有相同的字符，向后移
          if(index === lastIndex && currentComputedStr.length <= 1){
            console.log('single char', start, lastIndex <= index ? currentComputedStr.length : end)
            innerFind(start + 1, lastIndex <= index ? currentComputedStr.length : end);
          }else if(
            index === lastIndex ||
            (index + 1 === lastIndex && currentComputedStr[index] === currentComputedStr[lastIndex] && currentComputedStr.slice(index, lastIndex) === currentComputedStr)){
            console.log(1, currentComputedStr, index, lastIndex);
            return result.push(currentComputedStr);
          // 循环过程中，元素相等时
          }else if(currentComputedStr[index] === currentComputedStr[lastIndex]){
              index++;
              lastIndex--;
              console.log(2, currentComputedStr, index, lastIndex);
          }else if(currentComputedStr[index] !== currentComputedStr[lastIndex] && index +1 !== lastIndex){
          // 未到中间不相等时，进行左右子串及中间未计算部分子串的查找
              console.log(3, start, end, index, lastIndex);
              innerFind(start, index);
              innerFind(lastIndex + 1, end);
              innerFind(index, lastIndex + 1);
              return;
          }else if(index + 1 === lastIndex && currentComputedStr.length>=4){
              console.log(4, start, end, index, lastIndex);
              innerFind(start, end-1);
              innerFind(start+1, end);
              return;
          }else{
              break;
          }
      }
  }
  innerFind(0, len);
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
2 babad 1 1
1 babad 1 1
end [ 'babad' ]

 * start compare aacabdkacaa 0 11 0 10
2 aacabdkacaa 1 9
2 aacabdkacaa 2 8
2 aacabdkacaa 3 7
2 aacabdkacaa 4 6
3 0 11 4 6
start compare aaca 0 4 0 3
2 aaca 1 2
4 0 4 1 2
start compare aac 0 3 0 1
1 aac 0 1
start compare aca 1 4 0 2
2 aca 1 1
1 aca 1 1
start compare acaa 7 11 0 3
2 acaa 1 2
4 7 11 1 2
start compare aca 7 10 0 2
2 aca 1 1
1 aca 1 1
start compare caa 8 11 0 0
start compare bdk 4 7 0 0
end [ 'aac', 'aca', 'aca' ]
 */


/**
 * 无重复字符的最长子串
 * 1. "abcabcbb"   3
 * 2. "bbbbb" 1
 * 3. "pwwkew" --- wke 3
 */
var lengthOfLongestSubstring = function(s) {
  if(!s || typeof s !=='string' || s.length<1){
    return 0;
  }else if(!s || typeof s !=='string' || s.length===1){
      return 1;
  }

}
