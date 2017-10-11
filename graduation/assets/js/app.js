$(function() {
  //读取body data-type 判断是哪个页面然后执行相应页面方法，方法在下面。
  var dataType = $('body').attr('data-type');
  console.log(dataType);
  for (key in pageData) {
    if (key == dataType) {
      pageData[key]();
    }
  }
  if (dataType != "login") {
    load(dataType);
  }
  auth();
  autoLeftNav();
  $(window).resize(function() {
    autoLeftNav();
    console.log($(window).width())
  });

  //    if(storageLoad('SelcetColor')){

  //     }else{
  //       storageSave(saveSelectColor);
  //     }
})


// 页面数据
var pageData = {
  // ===============================================
  // 首页
  // ===============================================
  'index': function indexData() {

  },
  // ===============================================
  // 用户管理
  // ===============================================
  'user': function indexData() {
    var userType = $('body').attr('data-user-type');

    $("#selectUser").change(function() {
      var value = this.value;
      location.href = value + ".html";
    });

    $("#clean").click(function() {
      $('#clean-confirm').modal({
        relatedTarget: this,
        onConfirm: function(options) {
          var $link = $(this.relatedTarget).prev('a');
          var msg = $link.length ? '你要删除的链接 ID 为 ' + $link.data('id') :
            '确定了，但不知道要整哪样';
          alert(msg);
        },
        // closeOnConfirm: false,
        onCancel: function() {
          alert('算求，不弄了');
        }
      });
    });

    $(".delete-user").click(function() {
      console.log("delete");
      $('#delete-confirm').modal({
        relatedTarget: this,
        onConfirm: function(options) {
          var $link = $(this.relatedTarget).prev('a');
          var msg = $link.length ? '你要删除的链接 ID 为 ' + $link.data('id') :
            '确定了，但不知道要整哪样';
          alert(msg);
        },
        // closeOnConfirm: false,
        onCancel: function() {
          alert('算求，不弄了');
        }
      });
    });


  },
  // ===============================================
  // 选题列表
  // ===============================================
  'paper':function paperListData(){
    $(".delete-paper").click(function() {
      console.log("delete");
      $('#delete-confirm').modal({
        relatedTarget: this,
        onConfirm: function(options) {
          var $link = $(this.relatedTarget).prev('a');
          var msg = $link.length ? '你要删除的链接 ID 为 ' + $link.data('id') :
            '确定了，但不知道要整哪样';
          alert(msg);
        },
        // closeOnConfirm: false,
        onCancel: function() {
          alert('算求，不弄了');
        }
      });
    });

    $(".selectStudent").click(function(){
      if($(this).attr("isSelect")=='true'){
        alert("该选题已确选人，不能内定");
      }else{
         $('#my-prompt').modal({
          relatedTarget: this,
          onConfirm: function(e) {
            confirm('学号：' + e.data +'姓名：xxx,专业xxx,班级xxx，你确定一下要选择他么');
          },
          onCancel: function(e) {
            //alert('不想说!');
          }
        });
      }
         
    });

    $("#clean").click(function() {
      $('#clean-confirm').modal({
        relatedTarget: this,
        onConfirm: function(options) {
          var $link = $(this.relatedTarget).prev('a');
          var msg = $link.length ? '你要删除的链接 ID 为 ' + $link.data('id') :
            '确定了，但不知道要整哪样';
          alert(msg);
        },
        // closeOnConfirm: false,
        onCancel: function() {
          alert('算求，不弄了');
        }
      });
    });
  },
  'paperStudent':function paperStudentData(){
    $(".select-user").click(function() {
      $('#select-confirm').modal({
        relatedTarget: this,
        onConfirm: function(options) {
          var $link = $(this.relatedTarget).prev('a');
          var msg = $link.length ? '你要删除的链接 ID 为 ' + $link.data('id') :
            '确定了，但不知道要整哪样';
          alert(msg);
        },
        // closeOnConfirm: false,
        onCancel: function() {
          alert('算求，不弄了');
        }
      });
    });
  },
  // ===============================================
  // 登录页
  // ===============================================
  'login': function loginData() {
    $("#login").click(function() {
      var userTypeSeletor = $("select[name='userType']");
      setCookie("userType", userTypeSeletor.val());
      console.log(getCookie("userType"));
      location.href = "index.html";
    });
  }
}


// 风格切换

$('.tpl-skiner-toggle').on('click', function() {
  $('.tpl-skiner').toggleClass('active');
})

$('.tpl-skiner-content-bar').find('span').on('click', function() {
  $('body').attr('class', $(this).attr('data-color'))
  saveSelectColor.Color = $(this).attr('data-color');
  // 保存选择项
  storageSave(saveSelectColor);

})


// 侧边菜单开关
function autoLeftNav() {

  $('.tpl-header-switch-button').on('click', function() {
    if ($('.left-sidebar').is('.active')) {
      if ($(window).width() > 1024) {
        $('.tpl-content-wrapper').removeClass('active');
      }
      $('.left-sidebar').removeClass('active');
    } else {

      $('.left-sidebar').addClass('active');
      if ($(window).width() > 1024) {
        $('.tpl-content-wrapper').addClass('active');
      }
    }
  })

  if ($(window).width() < 1024) {
    $('.left-sidebar').addClass('active');
  } else {
    $('.left-sidebar').removeClass('active');
  }
}
//加载头部和导航
function load(dataType) {
  var url = "http://localhost/graduation";
  //var url = "http://www.feiyiqi.com/g/";
  $.ajax({
    url: url + "/public/header.html",
    success: function(res) {
      res = res.replace(/__PATH__/g, url);
      $("#app-header").html(res);

    }
  });

  $.ajax({
    url: url + "/public/nav.html",
    success: function(res) {
      res = res.replace(/__PATH__/g, url);
      $("#app-nav").html(res);
      var item = $("a[nav-data='" + dataType + "']");
      if (item.length == 1) {
        item.attr("class", "active");
      }
      auth();
    }
  });
}

function auth(){
  $(".auth-show").each(function(){
    var self = $(this);
    var authData = self.attr("auth-data");
    var userType = getCookie("userType");
    if(authData.indexOf(userType)!=-1){
      self.show();
    }
  });
}

// 侧边菜单
$('.sidebar-nav-sub-title').on('click', function() {
  $(this).siblings('.sidebar-nav-sub').slideToggle(80)
    .end()
    .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');
})

/*
 * 添加cookie
 */
function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
/*
 * 读取cookie
 */
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
/*
 *删除cookies
 */
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
/*
*获取url中的参数
*/
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if(r != null) return decodeURI(r[2]);
  return null; //返回参数值
}

/*
 * 时间格式转换
 */
Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if(/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for(var k in date) {
    if(new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
        date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}