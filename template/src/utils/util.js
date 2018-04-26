(function ToolClass () {
  console.log('ToolClass', 'init')
  window.Date.prototype.format = function (format) {
    var date = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      'S+': this.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in date) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1
          ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
      }
    }
    return format
  }
})()

export function getShortDate (date, format) {
  if (date && typeof date === 'number') {
    date = new Date(date)
  }
  date = date || new Date()
  format = format || 'yyyy-MM-dd'
  return date.format(format)
}
export function getShortDateRange (dateRange, future) {
  var o = []
  var dateRangeStart
  var dateRangeEnd
  if (!dateRange || dateRange.length === 0 || dateRange[0] === null || dateRange[1] === null || dateRange[0] === '') {
    if (future === 'future') {
      dateRangeStart = new Date().format('yyyy-MM-dd')
      dateRangeEnd = new Date((new Date().getTime() + 24 * 60 * 60 * 1000 * 365)).format('yyyy-MM-dd')
    } else {
      dateRangeStart = new Date((new Date().getTime() - 24 * 60 * 60 * 1000 * 6)).format('yyyy-MM-dd')
      dateRangeEnd = new Date().format('yyyy-MM-dd')
    }
  } else {
    dateRangeStart = dateRange[0].format('yyyy-MM-dd')
    dateRangeEnd = dateRange[1].format('yyyy-MM-dd')
  }
  var str = dateRangeStart + ' ~ ' + dateRangeEnd
  o.push(dateRangeStart)
  o.push(dateRangeEnd)
  o.push(str)
  return o
}

export function getYearMonthDay (monthNext, yearNext) {
  var monthNextVal = monthNext || 0
  var yearNextVal = yearNext || 0
  var o = {}
  var nowdays = new Date()
  var year = nowdays.getFullYear() + yearNextVal
  var month = nowdays.getMonth() + 1 + monthNextVal
  var day = nowdays.getDate()

  if (month === 0) {
    month = 12
    year = year - 1
  }
  while (month > 12) {
    month = month - 12
    year++
  }
  if (month < 10) {
    month = '0' + month
  }
  var myDate = new Date(year, month, 0)
  o.firstDay = year + '-' + month + '-' + '01' // 当月的第一天
  o.currentDay = year + '-' + month + '-' + (day.toString().length === 1 ? '0' + day : day) // 今天
  o.lastDay = year + '-' + month + '-' + myDate.getDate() // 当月的最后一天
  o.firstYearsDay = year + '-01-01' // 年份的第一天
  o.lastYearsDay = year + '-12-31' // 年份的最后一天
  return o
}
export function weekFormat (weeknumstr) {
  var ary = weeknumstr.split(',')
  var weekstrAry = []
  var weekObjAry = []
  if (ary.length > 0) {
    ary.forEach(function (item) {
      var weekstr = ''
      switch (parseInt(item)) {
        case 1: weekstr = '周一'; break
        case 2: weekstr = '周二'; break
        case 3: weekstr = '周三'; break
        case 4: weekstr = '周四'; break
        case 5: weekstr = '周五'; break
        case 6: weekstr = '周六'; break
        case 7: weekstr = '周日'; break
      }
      weekObjAry.push({
        day: item,
        daystr: weekstr
      })
      weekstrAry.push(weekstr)
    })
  }
  return {
    strAry: weekstrAry,
    objAry: weekObjAry
  }
}

// export const constant = () => {
export function constant () {
  function ConstantClass () {
  }
  ConstantClass.prototype.getSex = function (sex) {
    return sex === '1' ? '男' : '女'
  }
  ConstantClass.prototype.getLockStatus = function (lock) {
    return lock === '1' ? '账号被冻结' : '正常'
  }
  ConstantClass.prototype.getOrderManner = function (orderManner) {
    return parseInt(orderManner) === 1 ? '线上' : '线下'
  }
  ConstantClass.prototype.getCheckState = function (checkState) {
    return parseInt(checkState) === 1 ? '已体检' : '未体检'
  }
  ConstantClass.prototype.idtypeFormatter = function (idtype) {
    var idtypeText = ''
    switch (idtype) {
      case '1': idtypeText = '就诊卡'; break
      case '2': idtypeText = '身份证'; break
      case '3': idtypeText = '医保卡'; break
      case '4': idtypeText = '新农合'; break
      case '5': idtypeText = '台湾居民来往大陆通行证'; break
      case '6': idtypeText = '港澳居民身份证'; break
      case '7': idtypeText = '护照'; break
      case '8': idtypeText = '军官证'; break
      case '9': idtypeText = '士兵证'; break
      case '10': idtypeText = '残疾证'; break
    }
    return idtypeText
  }
  var singleton = null
  if (singleton == null) {
    singleton = new ConstantClass()
  }
  return singleton
  // var singleton = null
  // return (() => {
  //   if (singleton == null) {
  //     singleton = new ConstantClass()
  //   }
  //   return singleton
  // })()
}

export function bindToGlobal (obj, key = 'var') {
  if (typeof window[key] === 'undefined') {
    window[key] = {}
  }
  if (typeof obj === 'function') {
    window[key] = obj
    return
  }
  for (let i in obj) {
    window[key][i] = obj[i]
  }
}
export function getTabHeight (diff) {
  var height = document.body.clientHeight
  var tableHeight = height - 90 - parseInt(diff)
  return tableHeight
}

// 为元素添加类名
export function addClass (el, className) {
  // 先判断一下元素是否含有需要添加的类名，有则直接 return
  if (hasClass(el, className)) {
    return
  }
  // 把该元素含有的类名以空格分割
  let newClass = el.className.split(' ')
  // 把需要的类名 push 进来
  newClass.push(className)
  // 最后以空格拼接
  el.className = newClass.join(' ')
}

// 为元素删除类名
export function deleteClass (el, className) {
  // 先判断一下元素是否含有需要添加的类名，有则直接 return
  if (!hasClass(el, className)) {
    return
  }
  // 把该元素含有的类名以空格分割
  let newClass = el.className.split(' ')
  // 删除
  newClass.splice(newClass.indexOf(className), 1)
  // 最后以空格拼接
  el.className = newClass.join(' ')
}

// 判断是否有要查看的 className，有则返回true，否则返回 false
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')

  return reg.test(el.className)
}
