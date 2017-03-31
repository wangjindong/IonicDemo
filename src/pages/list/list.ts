import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { ButtonPage } from '../button/button';
import { InputPage } from '../input/input';
import { CanvasPage } from '../canvas/canvas';
import { Platform } from 'ionic-angular';

import { LoadingController,Loading } from 'ionic-angular';

declare let chcp:any;
declare let cordova:any;
/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {


  public contacts = [];
  private loader:Loading;

  constructor(public platform: Platform,public navCtrl: NavController,public loadingCtrl: LoadingController) {
    this.contacts =[
      {"icon":"icon_title.png","itemId":1,"title":"界面传值","detail":"界面传值","page":ContactPage,"params":{item1:'new-page'}},
      {"icon":"icon_title.png","itemId":2,"title":"Button","detail":"控件","page":ButtonPage},
      {"icon":"icon_title.png","itemId":3,"title":"Input","detail":"131233333333","page":InputPage},
      {"icon":"icon_title.png","itemId":4,"title":"检测升级","detail":"升级"},
      {"icon":"icon_title.png","itemId":5,"title":"Canvas","detail":"CanvasPage","page":CanvasPage},
      {"icon":"icon_title.png","itemId":6,"title":"模态","detail":"控件","page":ContactPage},
      {"icon":"icon_title.png","itemId":7,"title":"退出","detail":""},
    ]
  }
  itemClick(event,contact){
    if(contact.page != null){
      if(contact.params != null){
        this.navCtrl.push(contact.page,contact.params);
      }else{
        this.navCtrl.push(contact.page);
      }
    } else{
      if(contact.itemId == 4){
        this.loader = this.loadingCtrl.create({
          content: "开始升级，请稍后"
        });
        this.loader.present();
        chcp.fetchUpdate(this.fetchUpdateCallback);

      }else{
        this.platform.exitApp();
        //alert(contact.title);//点击每个记录弹出联系人名称
      }
    }
  }

  fetchUpdateCallback(error, data) {
    if (error) {
      //alert(error.description);
      this.loader.dismissAll();
    } else {
      this.loader.setContent("下载完成，开始安装");
      chcp.installUpdate(this.fetchUpdateCallback);
    }
  }
  installCallBack(error){
    if(error){
      this.loader.setContent("安装失败");
    }else{
      this.loader.setContent("安装成功");
    }
    this.loader.dismissAll();
  }
}
