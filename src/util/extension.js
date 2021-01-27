/* eslint-disable prefer-rest-params */
/* eslint-disable no-extend-native */
/* eslint-disable func-names */
// / <summary>
// / 引号转义符号
// / </summary>
String.EscapeChar = '\'';  
// / <summary>
// / 替换所有字符串
// / </summary>
// / <param name="searchValue">检索值</param> 
// / <param name="replaceValue">替换值</param> 
String.prototype.replaceAll = function (searchValue, replaceValue) {
    const regExp = new RegExp(searchValue, "g");
    return this.replace(regExp, replaceValue);
};
// / <summary>
// / 格式化字符串
// / </summary>
String.prototype.format = function () {
    const regexp = /\{(\d+)\}/g;
    const args = arguments;
    const result = this.replace(regexp, (m, i, o, n) => args[i]);
    return result.replaceAll('%', String.EscapeChar);
};
