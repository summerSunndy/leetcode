/**
 * 请实现一个函数用来匹配包含'. '和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（含0次）。在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但与"aa.a"和"ab*a"均不匹配。
输入:
s = "aa"
p = "a"
输出: false

输入:
s = "aa"
p = "a*"
输出: true

输入:
s = "ab"
p = ".*"
输出: true

输入:
s = "aab"
p = "c*a*b"
输出: true

输入:
s = "mississippi"
p = "mis*is*p*."
输出: false

 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const reg = new RegExp(`^${p}$`, 'y');
  console.log(reg);
  return reg.test(s);
};
