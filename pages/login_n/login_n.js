// pages/login_n/login_n.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,//选择什么方式登录控制
    school:["上海第二工业大学","重庆大学"],
    select_school:1,//学习选择框控制
    school_value:null,
    showmodal:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickaccount:function(){
    this.setData({
      current:0
    })
  },
  clickstu:function(){
    console.log("haha")
    this.setData({
      current: 1
    })
  },
  selectschool:function(){
    this.setData({
      select_school:0
    })
  },
  disselectschool:function(){
    this.setData({
      select_school: 1
    })
  },
  clickschool:function(res){
    const select = res.currentTarget.dataset.now;
    this.setData({
      school_value:this.data.school[select]
    })
  },
  userlogin:function(res){
    const value = res.detail.value;
    console.log(value);
    if (value.username==""&value.schoolId==""){
      wx.showToast({
        title: '账号不能为空哦！',
      })
    }else if (value.schoolpassword==""&value.password==""){
      wx.showToast({
        title: '密码不能为空哦！',
      })
    }else if (value.schoolId!=""&value.school==""){
      wx.showToast({
        title: '学习不能为空',
      })
    }else{
      wx.showLoading({
        title: '正在登陆中...',
        mask:"true"
      })
      if (value.username!=null&&value.username!=""){
        this.datalogin(value.username,value.password)
      }else{
        this.accountlogin(3,value.schoolId, value.schoolpassword)
      }

      
      
      // result = this.schoollogin(value.schoolId,value.schoolpassword,3,0)
    }
  },
  // 以账号登录
  datalogin:function(username,password){
    var page_this = this;
    wx.request({
      url: 'http://localhost:2019/jiaxiao/WxFun',
      data:{
        "method":"login",
        "uname":username,
        "password":password
      },
      header:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: "post",
      success(res){
        console.log(res)
        if (res.data.state==1){
          page_this.loginOk()
        }else{
          var msg = {
            "title":"登录失败",
            "content":res.data.msg
          }
          page_this.loginError(msg)
        }
      }
    })
  },
  //以学号和工号登录
  accountlogin:function(school,schoolId,schoolPassword){
    var page_this = this;
    wx.request({
      url: 'http://localhost:2019/jiaxiao/WxFun',
      data: {
        "method": "loginByAccount",
        "uname": schoolId,
        "password": schoolPassword
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success(res) {
        console.log(res)
        if (res.data.state == 1) {
          page_this.loginOk()
        } else {
           //数据库记录密码错误
          page_this.schoollogin(schoolId,schoolPassword,3,0);
          // if (result.data.state==1){
          //   //转到注册里
          // }else{
          //   var msg = {
          //     "title": "登录失败",
          //     "content": res.data.msg
          //   }
          //   page_this.loginError(msg)
          // }
          
        }
      }
    })
  }
  ,
  //学校登录
  schoollogin:function(username,password,school,system=null){
    var _page_this = this;
    var result = null;
    var page_this = this;
    wx.request({
      url: 'http://127.0.0.1:8000/login',
      data:{
        "username":username,
        "password":password,
        "school":school,
        "system":system,
      },
      method:"GET",
      success(res){
        console.log(res);
        if(res.data.state==-1){
          page_this.loginError(res.data)
        }else{
          page_this.loginOk();
          _page_this.setData({
            showmodal:true
          });
          wx.setStorage({
            key: 'loginuser',
            data: {
            "username":null,
            "password":null,
            "sex":null,
            "phone":null,
            "account":username,
            "oa_password":password,
            "school":school
            },
          })
        }
        
      }
      
    });
  },
  // 登录失败
  loginError:function(msg){
    wx.hideLoading()
    wx.showModal({
      title: msg.title,
      content: msg.content,
      showCancel:false
    })
  },
  // 登录成功
  loginOk: function () {
    wx.showToast({
      title: '登陆成功',
    })
    wx.hideLoading()
  },
  //弹框取消登录
  logincacel:function(){
    this.setData({
      showmodal:false
    })
  },
  //以学号注册登录弹框。
  relogin:function(res){
    var username = res.detail.value.username;
    var password = res.detail.value.password;
    var phone = res.detail.value.phone;
    if(res.detail.value.username==""){
      wx.showToast({
        title: '用户名不能为空哦！',
      })
    } else if (res.detail.value.password == ""){
      wx.showToast({
        title: '密码不能为空哦！',
      })
    } else if (res.detail.value.phone==""){
      wx.showToast({
        title: '手机号不能为空哦！',
      })
    }else{
      wx.getStorage({
        key: 'loginuser',
        success: function (res) {
          console.log(res)
          wx.setStorage({
            key: 'loginuser',
            data: {
              "username": username,
              "password": password,
              "sex": null,
              "phone": phone,
              "account": res.data.account,
              "oa_password": res.data.oa_password,
              "school": res.data.school
            },
          })
        },
      })
    }
    
  }
})