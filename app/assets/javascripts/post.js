$(document).on('turbolinks:load', function(){
  
  $("a").on("click", function() {
    clearInterval(timer);
    buildform();
  });

  // 1ページ目だけにランキングをだす
  if (document.URL.match("/?page")){
    $(".rankingall").html("")
  }

  $(".thankyou").hide();
  
  $(".submit-btn").hide();
  $(".point").hide();
  $(".btnclick").hide();

  $(".wantform").hide();





  // カウントアップする数字
  var countNum;
  
  // カードのシャッフル用配列
  var cardArray;
  
  // 経過時間
  var time;
  
  // タイマー用の変数
  var timer;
  
  // 関数の実行
  init();
  
  
  // 初期設定用の関数init
  function init(){
    // 変数、配列の初期化
    countNum = 1;
    cardArray = [];
    time = 0;
    
    // cardArray = []を
    // cardArray = [0, 1, 2, 3...24]に
    for(var i = 0; i <= 24; i++){
      cardArray.push(i);
    }
    
    // cardArray = [0, 1, 2, 3, 4...]を
    // cardArray = [3, 6, 19, 23...]に
    for(var i = 0; i < cardArray.length; i++){
      var tmpNum = cardArray[i];
      var r = Math.floor(Math.random() * cardArray.length);
      
      cardArray[i] = cardArray[r];
      cardArray[r] = tmpNum;
    }
    
    // #numbersの中を空にする
    $("#numbers").html("");
    
    // #numbersの中にカードを生成
    for(var i = 0; i <= 24; i++){
      var cardNum = cardArray[i] + 1;
      $("#numbers").prepend("<div>" + cardNum + "</div>");
    }
  }
  
  
  function buildform(){
    let html = ``
    $("#game").append(html);
  }
  
  // プレイ時間計測用の関数
  function timerFunc(){
    // 変数timeの値を更新して、#timer spanに表示
    time++;
    $("#timer span").html(time);
  }
  
  // 「Start」ボタンをクリック
  $("button").click(function(){
    // スタート画面を非表示に
    $("#startScene").hide();
    
    // タイマー開始
    timerFunc();
    timer = setInterval(timerFunc, 10);

    // カードを選択
    $("#numbers div").click(function(){
      // カードの数字を取得
      var num = $(this).html();

      // 変数numと変数countNumを比較
      if(num == countNum){
        // カードのスタイル変更
        $(this).addClass("hit");

        // 数字を一つ増やす
        countNum++;

        // 変数countNumが26であれば、ゲーム終了
        if(countNum == 26){
          // タイマー停止
          clearInterval(timer);
          buildform();

          // プレイ時間の表示
          $(".yourrecord").html("Your Record : " + $("#timer span").html());

          // formへ"#timer span"を飛ばす!!!
          $("#post_time").val($("#timer span").html())

          // ボタンのテキスト変更
          $("button").html("PLAY AGAIN");

          // ゲーム終了時にフォームにボタンと文字を表示
          $(".thankyou").show();

          $(".submit-btn").show();
          $(".point").show();
          $(".btnclick").show();

          $(".wantform").show();

          
          // この3行がないと97、98行目によってプレイ時間が3行表示されてしまう
          $(".callout").html("");
          $(".pleaseplay").html("");
          // $(".feelfree").html("");     コメントを書いてもらうために残す


          // スタート画面の表示
          $("#startScene").show();

          

          // プレイ時間の比較
          if($("#record span").html() - $("#timer span").html() > 0 || $("#record span").html() == 0){
            // 記録の更新
            $("#record span").html($("#timer span").html());
          }

          // 初期設定
          init();
        }
      }
    });
  });
});


