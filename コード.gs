// LINEの認証を突破するために必要なお作法
var secret_token = "wcjACGH0MmZz3R+w6QRdciH3mgQ9VCyaISaHjQhn45E8dLasVSc/ChNvQD9ybNfjDL+urNzbFSWoXl81+gYpqpSy1flZDxWAXntIRxZuC8HP4QJA/+YE74U4vaZLybJisuSXHGbunD3yw3d+NBiG8QdB04t89/1O/w1cDnyilFU="
var secret = "Bearer " + secret_token;

function doPost(e) {
  var line = JSON.parse(e.postData.contents).events[0];
  var json = e.postData.getDataAsString();
  
  // LINEから送信されてきたデータから、リプライトークンを取得
  var token = JSON.parse(json).events[0].replyToken;
  
  // 送信されてきたデータのタイプを取得
  var type = JSON.parse(json).events[0].message.type;
  
  // メッセージ送信者のユーザーIDを取得する
  var userId = getUserID(line);
  
  //UserNameの取得
  var userName = getUserName(userId);
  
  // リプライを返すAPIのURI
  var url = "https://api.line.me/v2/bot/message/reply";
  
  // HTTPヘッダーの設定
  var headers = {
    "Content-Type" : "application/json",
    "Authorization":secret
  };
  
  // タイプがtextの場合、処理を行う
  if(type == "text"){
    var text = JSON.parse(json).events[0].message.text;
    switch(text){
      case "振込口座" :
        var data = returnMessage(token, "金融機関:三菱東京UFJ銀行\n支店名:八尾支店\n口座種別:普通\n口座番号:0199344\n口座名義:カンシャラ コウヅミナト");
        break;
      case "墾田永年私財法2019" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_manager
        };
        break;
      case "料金" :
        var data = returnMessage(token, "・鳴子/片方:￥1,250\n・鳴子/1組:￥2,500\n・衣装:￥20,000");
        break;
      case "申請状況確認" :
        var data = checkApplicationStatus(userId,token);
        break;
        // 管理者用メンバー申請状況確認
      case "メンバー申請状況" :
        var data = checkStatusForManager(token);
        break;  
      case "イベント連絡" :
        var data =  {
          "replyToken" : token, 
          "messages" : [ret_msg_inst]
        };
        break;
      case "行ってらっしゃい！" :
        break;
      case "キャンセル連絡" :
        // var data = returnMessage(token, "現在参加できるイベントはありません。")
        // さくよさ時期に復活
        var data =returnMessage(token, "サークルスクエアで不参加への更新をお願いします。\nhttps://www.c-sqr.net/cs75424/News.html\n\nまた、2/24(日)以降のキャンセルの場合は、下記の2人にも連絡してね。\n\n■祭り担当：きゃべ\nhttps://line.me/ti/p/WXuIvR2nS0\n■インスト担当：たらこ\nhttps://line.me/ti/p/umUggC9ucM");
        break;
      case "サークルスクエア":
        var data = returnMessage(token, "イベント参加はサークルスクエアより参加表明をお願いします。\n\nhttps://www.c-sqr.net/cs75424/News.html");
        break;
      case "教えて担当さん":
        var data = returnMessage(token, "さくよさの担当者は以下の2人です！相談はお二人へ！\n\n■イベント参加などで悩んでる\n祭り担当:きゃべ\nhttps://line.me/ti/p/WXuIvR2nS0\n\n■演舞のことなどで悩んでる\nインスト担当:たらこ\nhttps://line.me/ti/p/umUggC9ucM");
        break;  
      case "振り動画" :
        var data = returnMessage(token, "振り動画は制作中です！しばらく待ってね。");
        // 振り動画作成完了後復活
        /*
        var data =  {
        "replyToken" : token, 
        "messages" : [ret_msg_mv]
        };
        */
        break;
        // 持ち物チェック
      case "持ち物チェック" :
        var data =  {
          "replyToken" : token, 
          "messages" : [ret_check]
        };
        break;
      case "購入申請" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_purchase
        };
        break;
      case "受け取り確認" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_receive
        };
        break;
      case "鳴子/1組(a)" :
        var item = "鳴子/1組";
        var price = 2500;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "鳴子/片方(a)" :
        var item = "鳴子/片方";
        var price = 1250;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;  
      case "衣装/XS(a)" :
        var item = "衣装/XS";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/S(a)" :
        var item = "衣装/S";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/M(a)" :
        var item = "衣装/M";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/L(a)" :
        var item = "衣装/L";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/XL(a)" :
        var item = "衣装/XL";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "支払い関連" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_payment
        };
        break;
      case "鳴子/1組(p)" :
        var item = "鳴子/1組";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/片方(p)" :
        var item = "鳴子/片方";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;  
      case "衣装/XS(p)" :
        var item = "衣装/XS";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/S(p)" :
        var item = "衣装/S";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/M(p)" :
        var item = "衣装/M";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/L(p)" :
        var item = "衣装/L";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/XL(p)" :
        var item = "衣装/XL";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/1組(r)" :
        var item = "鳴子/1組";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/片方(r)" :
        var item = "鳴子/片方";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;  
      case "衣装/XS(r)" :
        var item = "衣装/XS";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/S(r)" :
        var item = "衣装/S";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/M(r)" :
        var item = "衣装/M";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/L(r)" :
        var item = "衣装/L";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/XL(r)" :
        var item = "衣装/XL";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "申請取消" :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep_purchase_cancel
        };
        break;
      case "鳴子/1組(ad)" :
        var item = "鳴子/1組";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "鳴子/片方(ad)" :
        var item = "鳴子/片方";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;  
      case "衣装/XS(ad)" :
        var item = "衣装/XS";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/S(ad)" :
        var item = "衣装/S";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/M(ad)" :
        var item = "衣装/M";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/L(ad)" :
        var item = "衣装/L";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/XL(ad)" :
        var item = "衣装/XL";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "支払い取消" :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep_cancel_payment
        };
        break;
      case "鳴子/1組(pd)" :
        var item = "鳴子/1組";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "鳴子/片方(pd)" :
        var item = "鳴子/片方";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;  
      case "衣装/XS(pd)" :
        var item = "衣装/XS";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/S(pd)" :
        var item = "衣装/S";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/M(pd)" :
        var item = "衣装/M";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/L(pd)" :
        var item = "衣装/L";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/XL(pd)" :
        var item = "衣装/XL";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      default :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep
        };
        break;
    }
  }else{
    var data = {
      "replyToken" : token,
      "messages" : quick_rep
    };
  };
  
  
  var options = {
    "method" : "POST",
    "headers" : headers,
    "payload" : JSON.stringify(data)
  };
  
  return UrlFetchApp.fetch(url, options);  
}
