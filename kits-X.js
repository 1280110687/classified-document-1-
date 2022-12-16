/* 
  我们将来在开发的时候，肯定会有很多重复使用的代码
  这些代码我们应该封装起来，以提高工作效率

  怎么封装呢？
    通常我们喜欢把方法封装到对象身上
*/
var kits = {};
// 小于10的在前面补0
kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}
// 获取当前时间
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

// 获取n到m之间的随机整数
kits.randomInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

// 常见的给id的方式1
// 当前时间戳 + 大的随机数
kits.getId = function () {
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime();// 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000, 999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
}

// 创建随机rgb颜色
kits.randomRgbColor = function () {
  let r = this.randomInt(0, 255);
  let g = this.randomInt(0, 255);
  let b = this.randomInt(0, 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// 16进制每一位上可以是从小到大为0、1、2、3、4、5、6、7、8、9、A、B、C、D、E、F16个大小不同的数，即逢16进1，其中用A，B，C，D，E，F（字母使用大写）这六个字母来分别表示10，11，12，13，14，15。
kits.randomHexColor = function () {
  let colorValue = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f';
  // 以","为分隔符，将colorValue字符串分割为数组['0','1',...'f']
  let colorArray = colorValue.split(',');
  let color = '#';
  // 使用for循环从16个数组中随机选出6位数
  for (let i = 0; i < 6; i++) {
    // color += colorArray[Math.floor(Math.random()*16)];
    color += colorArray[this.randomInt(0, 16)];
  }
  return color;
}

/**
 * @description 从本地存储中读取复杂数据
 * @param {string} 要以哪个键从本地存储中读取数据
 * @returns {object} 读取出来的，镜JSON转换的复杂数据
 */
//获取本地数据
kits.loadArrayFromLocalStorage = function(key){
  let json = localStorage.getItem(key);
  let arr = JSON.parse(json);
  return arr || [];
}

/**
 * @description 封装好的把复杂数据存储到本地里面的方法，默认是存储json格式字符串
 * @param {string} key 存储到本地里面的键
 * @param {object} obj 要存储的复杂数据
 * @returns undefined
 */
// 存储数据到浏览器本地
kits.saveArrayTolLocalStorage = function(key,obj){
  let json = JSON.stringify(obj);
  localStorage.setItem(key,json);
}

// 向本地存储里指定 key 追加数据
kits.appendDataToArray = function(key,data){
  let arr = this.loadArrayFromLocalStorage(key);
  let json = JSON.stringify(data);
  arr.append(data);
  this.saveArrayTolLocalStorage(key,arr);
}

// 根据id从本地存储中指定key中删除数据
kits.deleteLocalDataById = function(key,id){
  let arr = this.loadArrayFromLocalStorage(key);
  arr.forEach((e,i) =>{
    if(e.id == id){
      arr.splice(i,1);
    }
  });
  this.saveArrayTolLocalStorage(key,arr);
}

// 根据ID修改数据
kits.modifyLocalDataById = function(key,id,data){
  let arr = this.loadArrayFromLocalStorage(key);
  let flag = false;
  arr.forEach(function(e,i){
    if(e.id == id){
      flag = true;
      arr[i] = data;
      return;
    }
  })
  this.saveArrayTolLocalStorage(key,arr);
  return flag;
}

/**
 * JS 计算两个时间间隔多久（时分秒）
 * @param startTime "时间戳"
 * @param endTime "时间戳"
 * @return 1天2时3分5秒
 */
export function twoTimeInterval(startTime, endTime) {
  // 时间相差秒数
  let dateDiff = endTime - startTime;

  // 计算出相差天数
  let days = Math.floor(dateDiff / (24 * 3600 * 1000));

  // 计算出小时数
  let residue1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  let hours = Math.floor(residue1 / (3600 * 1000));

  // 计算相差分钟数
  let residue2 = residue1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  let minutes = Math.floor(residue2 / (60 * 1000));

  // 计算相差秒数
  let residue3 = residue2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  let seconds = Math.floor(residue3 / 1000);

  // 计算相差毫秒数
  let residue4 = residue3 % 1000; // 计算秒数后剩余的毫秒数
  let millisecond = residue4;

  let returnVal = "";
  if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
    returnVal = millisecond == 0 ? "" : millisecond + "毫秒";
  } else {
    returnVal =
      (days == 0 ? "" : days + "天") +
      (hours == 0 ? "" : days + "时") +
      (minutes == 0 ? "" : minutes + "分") +
      (seconds == 0 ? "" : seconds + "秒");
  }

  return returnVal;
}

/**
 * 数组根据数组对象中的某个属性值进行排序的方法
 * 使用例子：list.sort(sortBy('xxx',false)) // 表示根据xxx属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性
 * @param rev true表示升序排列，false降序排序
 * */
export function sortBy(attr, rev) {
  //第二个参数没有传递 默认升序排列
  if (rev == undefined) {
    rev = 1;
  } else {
    rev = rev ? 1 : -1;
  }
  return function (a, b) {
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 0;
  };
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
