// pages/login/login.js
const OCCUPATION = ["老师","家长","学生"]
var check = require('../../utils/checkNO.js')
var userlogin = require('../../utils/login.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [["上海","重庆"],["上海第二工业大学","电力大学"]],
    multiIndex: [0, 0],
    occupation:"",
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
  changevalue:function(res){
    this.setData({
      multiIndex: res.detail.value
    });
  },
  columnchange:function(res){
    var data = {
      multiArray:this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    
    switch(res.detail.column){
      case 0:
        switch (res.detail.value) {
          case 0:
            data.multiArray[1] = ["上海第二工业大学", "其他上海学校"];
            data.multiIndex[0] = 0;
            break;
          case 1:
            data.multiArray[1] = ["重庆大学", "其他重庆学校"];
            data.multiIndex[0] = 1;
            break;
        };
        break;
      case 1:
        data.multiIndex[1] = res.detail.value
        break;
    };
    console.log(data)
    this.setData(data);
  },
  selectOccupation:function(){
    wx.showActionSheet({
      itemList: OCCUPATION,
      success:(res) =>{
        this.setData({
          occupation:OCCUPATION[res.tapIndex]
        })
      }
    })
  },
  formSubmit:function(res){
    console.log(res.detail.value);
    const submit = res.detail.value;
    const re = check.checkNO(res.detail.value);
    console.log(re)
    if (!re){
      wx.showToast({
        title: '你输入的内容为空',
        icon:"none"
      })
    }else{
      if (submit.occupation=="学生"){
        result = userlogin.login(submit)
        console.log(result)
        if (result["state"]==1){
          wx.showToast({
            title: '登录成功,正在进入',
            icon:"loading"
          })
        }
      }
    }
    
  }
})