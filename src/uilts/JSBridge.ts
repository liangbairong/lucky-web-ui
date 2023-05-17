declare global {
  interface Window {
    YWJSBridge: any,
    webkit:any,
    getUserInfo_callBack:any,
    appSystemInfo_callBack:any,
    getAppPendantInfo_callBack:any
  }
}
const JSBridge = {
  //跳转app登录
  toAppLogin: function() {
    try {
      if (window.YWJSBridge) window.YWJSBridge.login()
    } catch (err) {
      console.error('Android login err', err)
    }
    try {
      if (window.webkit) {
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          'type': 'login'
        })
      }
    } catch (err) {
      console.error('ios login err', err)
    }
  },
  // 跳转app个人中心
  toAppPersonal: function(uid:string) {
    console.log('toAppPersonal')
    try {
      if (window.YWJSBridge) window.YWJSBridge.goHomePage(uid)
    } catch (err) {
      console.error('Android topersonal err', err)
    }
    try {
      if (window.webkit) {
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          'type': 'goHomePage',
          'userId': uid
        })
      }
    } catch (err) {
      console.error('ios topersonal err', err)
    }
  },
  // 跳转指定直播间
  toAppLive: function(uid:string, avt:string) {
    console.log('toAppLive')
    try {
      if (window.YWJSBridge) window.YWJSBridge.enterLiveRoom(uid, avt)
    } catch (err) {
      console.error('Android toliveRoom err', err)
    }
    try {
      if (window.webkit) {
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          'type': 'enterLiveRoom',
          'userId': uid,
          'avatar': avt
        })
      }
    } catch (err) {
      console.error('ios toliveRoom err', err)
    }
  },
  // 跳转app充值页面
  toAppRecharge: function() {
    try {
      if (window.YWJSBridge) window.YWJSBridge.enterRecharge()
    } catch (err) {
      console.error('Android tocharge err', err)
    }
    try {
      if (window.webkit) {
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          'type': 'enterRecharge'
        })
      }
    } catch (err) {
      console.error('ios tocharge err', err)
    }
  },
  // app打开新webview
  /**
   * 打开新的web,当是半屏页面的时候可以控制，如果是全屏页面只能打开全屏的页面
   * @param url 链接地址
   * @param type 1：打开全屏页面、2：打开半屏页面
   */
  openWebView: function(url: string, type = 2) {
    try {
      if (window.YWJSBridge) window.YWJSBridge.openWebView(url, type)
      console.log('openWebView')
    } catch (err) {
      console.error('Android tocharge err', err)
    }
    try {
      if (window.webkit) {
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          'type': 'openWebView',
          'url': url,
          'type2': type
        })
      }
    } catch (err) {
      console.error('ios tocharge err', err)
    }
  },
  // app关闭网页弹窗
  appCloseWeb: function() {
    try {
      if (window.YWJSBridge) window.YWJSBridge.closeWeb()
    } catch (err) {
      console.error('Android tocharge err', err)
    }
    try {
      if (window.webkit) {
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          'type': 'closeWeb'
        })
      }
    } catch (err) {
      console.error('ios tocharge err', err)
    }
  },
  // app签到
  appDailySignIn: function() {
    try {
      if (window.YWJSBridge) window.YWJSBridge.dailySignIn()
    } catch (err) {
      console.error('Android tocharge err', err)
    }
    try {
      if (window.webkit) {
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          'type': 'dailySignIn'
        })
      }
    } catch (err) {
      console.error('ios tocharge err', err)
    }
  },
  // 获取用户系统信息
  GetAppSystemInfo: function(appSystemInfo_callBack:(obj:any)=>{}) {
    try {
      if (window.YWJSBridge) {
        const systemInfo = window.YWJSBridge.getAppSystemInfo()
        appSystemInfo_callBack(JSON.parse((systemInfo)))
      }
    } catch (err) {
      console.error('Android appSystemInfo err', err)
    }
    try {
      // 建立window全局函数接收jsbridge的值
      window['appSystemInfo_callBack'] = appSystemInfo_callBack
      if (window.webkit) {
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          'type': 'getAppSystemInfo',
          'callBack': 'appSystemInfo_callBack'
        })
      }
    } catch (err) {
      console.error('ios appSystemInfo err', err)
    }
  },
  // 挂件显示隐藏
  controlPendantShowAndHide: function(state: boolean, height: number = 0) {
    console.log(state)
    try {
      if (window.YWJSBridge) window.YWJSBridge.controlPendantShowAndHide(state, height)
    } catch (err) {
      console.error('Android tocharge err', err)
    }

    try {
      if (window.webkit) {
        console.log('controlPendantShowAndHide')
        console.log(height)
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          'type': 'controlPendantShowAndHide',
          'state': state,
          'height': height
        })
      }
    } catch (err) {
      console.error('ios tocharge err', err)
    }
  },
  // 获取挂件信息
  getAppPendantInfo: function(getAppPendantInfo_callBack:(obj:any)=>{}) {
    try {
      if (window.YWJSBridge) {
        const data = window.YWJSBridge.getAppPendantInfo()
        getAppPendantInfo_callBack(data)
      }
    } catch (err) {
      console.error('Android tocharge err', err)
    }

    try {
      if (window.webkit) {
        window['getAppPendantInfo_callBack'] = getAppPendantInfo_callBack
        console.log('getAppPendantInfo')
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          'type': 'getAppPendantInfo',
          'callBack': 'getAppPendantInfo_callBack'
        })
      }
    } catch (err) {
      console.error('ios tocharge err', err)
    }
  },

}

export default JSBridge
