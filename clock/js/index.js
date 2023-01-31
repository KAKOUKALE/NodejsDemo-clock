
  window.onload = function() {
    // 定时器，每个1秒执行1次
    setInterval(() => {
      let dt = new Date()
      let HH = dt.getHours()
      let mm = dt.getMinutes()
      let ss = dt.getSeconds()

      // 动态渲染到页面
      document.querySelector('.HH').innerHTML = addZero(HH)
      document.querySelector('.mm').innerHTML = addZero(mm)
      document.querySelector('.ss').innerHTML = addZero(ss)
    })

    // 时间格式函数
    function addZero(t) {
      return t > 9 ? t : '0' + t
    }
  }
