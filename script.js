// ==========================================
// POINT BANK
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // 基本設定
  // ========================================

  const DEFAULT_INITIAL_BALANCE = 5000;


  // ========================================
  // 五十音 → 数字
  // ========================================

  const kanaNumbers = {
    "あ":"1",
    "い":"2",
    "う":"3",
    "え":"4",
    "お":"5",

    "か":"6",
    "き":"7",
    "く":"8",
    "け":"9",
    "こ":"10",

    "さ":"11",
    "し":"12",
    "す":"13",
    "せ":"14",
    "そ":"15",

    "た":"16",
    "ち":"17",
    "つ":"18",
    "て":"19",
    "と":"20",

    "な":"21",
    "に":"22",
    "ぬ":"23",
    "ね":"24",
    "の":"25",

    "は":"26",
    "ひ":"27",
    "ふ":"28",
    "へ":"29",
    "ほ":"30",

    "ま":"31",
    "み":"32",
    "む":"33",
    "め":"34",
    "も":"35",

    "や":"36",
    "ゆ":"37",
    "よ":"38",

    "ら":"39",
    "り":"40",
    "る":"41",
    "れ":"42",
    "ろ":"43",

    "わ":"44",
    "を":"45",
    "ん":"46",

    "ー":"#"
  };


  // ========================================
  // 濁点
  // ========================================

  const dakutenMap = {
    "か":"が",
    "き":"ぎ",
    "く":"ぐ",
    "け":"げ",
    "こ":"ご",

    "さ":"ざ",
    "し":"じ",
    "す":"ず",
    "せ":"ぜ",
    "そ":"ぞ",

    "た":"だ",
    "ち":"ぢ",
    "つ":"づ",
    "て":"で",
    "と":"ど",

    "は":"ば",
    "ひ":"び",
    "ふ":"ぶ",
    "へ":"べ",
    "ほ":"ぼ"
  };


  // ========================================
  // 半濁点
  // ========================================

  const handakutenMap = {
    "は":"ぱ",
    "ひ":"ぴ",
    "ふ":"ぷ",
    "へ":"ぺ",
    "ほ":"ぽ"
  };


  // ========================================
  // 小文字
  // ========================================

  const smallKanaMap = {
    "つ":"っ",

    "や":"ゃ",
    "ゆ":"ゅ",
    "よ":"ょ",

    "あ":"ぁ",
    "い":"ぃ",
    "う":"ぅ",
    "え":"ぇ",
    "お":"ぉ"
  };


  // ========================================
  // HTML要素取得
  // ========================================

  const homeScreen =
    document.getElementById("homeScreen");

  const nameScreen =
    document.getElementById("nameScreen");

  const atmScreen =
    document.getElementById("atmScreen");

  const withdrawScreen =
    document.getElementById("withdrawScreen");

  const masterScreen =
    document.getElementById("masterScreen");


  const openNameButton =
    document.getElementById("openNameScreen");

  const openATMButton =
    document.getElementById("openATM");


  const nameDisplay =
    document.getElementById("nameDisplay");

  const numberResult =
    document.getElementById("numberResult");


  const dakutenButton =
    document.getElementById("dakutenButton");

  const handakutenButton =
    document.getElementById("handakutenButton");

  const smallButton =
    document.getElementById("smallButton");

  const deleteButton =
    document.getElementById("deleteButton");

  const clearButton =
    document.getElementById("clearButton");

  const convertButton =
    document.getElementById("convertButton");


  const accountInput =
    document.getElementById("accountInput");

  const atmDelete =
    document.getElementById("atmDelete");

  const accountConfirm =
    document.getElementById("accountConfirm");

  const atmMessage =
    document.getElementById("atmMessage");


  const accountName =
    document.getElementById("accountName");

  const balanceDisplay =
    document.getElementById("balanceDisplay");

  const withdrawInputDisplay =
    document.getElementById("withdrawInput");

  const withdrawDelete =
    document.getElementById("withdrawDelete");

  const withdrawAll =
    document.getElementById("withdrawAll");

  const withdrawConfirm =
    document.getElementById("withdrawConfirm");

  const withdrawMessage =
    document.getElementById("withdrawMessage");

  const returnATM =
    document.getElementById("returnATM");


  const initialBalanceInput =
    document.getElementById("initialBalanceInput");

  const saveInitialBalance =
    document.getElementById("saveInitialBalance");

  const masterSettingMessage =
    document.getElementById("masterSettingMessage");

  const masterAccountList =
    document.getElementById("masterAccountList");

  const accountCount =
    document.getElementById("accountCount");

  const closeMaster =
    document.getElementById("closeMaster");

  const resetAllData =
    document.getElementById("resetAllData");


  // ========================================
  // データ
  // ========================================

  let accounts = {};

  let settings = {
    initialBalance: DEFAULT_INITIAL_BALANCE
  };


  function loadData() {

    const savedAccounts =
      localStorage.getItem("pointBankAccounts");

    const savedSettings =
      localStorage.getItem("pointBankSettings");


    if (savedAccounts) {

      try {

        accounts =
          JSON.parse(savedAccounts);

      } catch (error) {

        accounts = {};

      }

    }


    if (savedSettings) {

      try {

        const loadedSettings =
          JSON.parse(savedSettings);


        if (
          loadedSettings &&
          Number.isFinite(
            Number(loadedSettings.initialBalance)
          )
        ) {

          settings.initialBalance =
            Number(
              loadedSettings.initialBalance
            );

        }

      } catch (error) {

        settings.initialBalance =
          DEFAULT_INITIAL_BALANCE;

      }

    }

  }


  function saveAccounts() {

    localStorage.setItem(
      "pointBankAccounts",
      JSON.stringify(accounts)
    );

  }


  function saveSettings() {

    localStorage.setItem(
      "pointBankSettings",
      JSON.stringify(settings)
    );

  }


  // ========================================
  // 画面切り替え
  // ========================================

  const screens =
    document.querySelectorAll(".screen");


  function showScreen(screenId) {

    screens.forEach(screen => {

      screen.classList.remove("active");

    });


    const target =
      document.getElementById(screenId);


    if (target) {

      target.classList.add("active");

    }

  }


  // ========================================
  // 名前入力
  // ========================================

  let inputName = [];


  function updateNameDisplay() {

    if (inputName.length === 0) {

      nameDisplay.innerHTML =
        '<span class="placeholder">' +
        'ここに名前が表示されます' +
        '</span>';

      return;

    }


    nameDisplay.textContent =
      inputName.join("");

  }


  function resetNameScreen() {

    inputName = [];

    updateNameDisplay();

    numberResult.textContent =
      "---";

  }


  // ========================================
  // 五十音ボタン
  // ========================================

  document
    .querySelectorAll("[data-kana]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const kana =
            button.dataset.kana;


          if (!kana) {
            return;
          }


          inputName.push(kana);

          updateNameDisplay();

          numberResult.textContent =
            "---";

        }
      );

    });


  // ========================================
  // 濁点
  // ========================================

  dakutenButton.addEventListener(
    "click",
    () => {

      if (!inputName.length) {
        return;
      }


      const index =
        inputName.length - 1;

      const kana =
        inputName[index];


      if (dakutenMap[kana]) {

        inputName[index] =
          dakutenMap[kana];

        updateNameDisplay();

        numberResult.textContent =
          "---";

      }

    }
  );


  // ========================================
  // 半濁点
  // ========================================

  handakutenButton.addEventListener(
    "click",
    () => {

      if (!inputName.length) {
        return;
      }


      const index =
        inputName.length - 1;

      const kana =
        inputName[index];


      if (handakutenMap[kana]) {

        inputName[index] =
          handakutenMap[kana];

        updateNameDisplay();

        numberResult.textContent =
          "---";

      }

    }
  );


  // ========================================
  // 小文字
  // ========================================

  smallButton.addEventListener(
    "click",
    () => {

      if (!inputName.length) {
        return;
      }


      const index =
        inputName.length - 1;

      const kana =
        inputName[index];


      if (smallKanaMap[kana]) {

        inputName[index] =
          smallKanaMap[kana];

        updateNameDisplay();

        numberResult.textContent =
          "---";

      }

    }
  );


  // ========================================
  // 1文字削除
  // ========================================

  deleteButton.addEventListener(
    "click",
    () => {

      inputName.pop();

      updateNameDisplay();

      numberResult.textContent =
        "---";

    }
  );


  // ========================================
  // 名前クリア
  // ========================================

  clearButton.addEventListener(
    "click",
    () => {

      resetNameScreen();

    }
  );


  // ========================================
  // かな → 数字
  // ========================================

  function convertKana(kana) {

    if (kanaNumbers[kana]) {

      return kanaNumbers[kana];

    }


    for (
      const [base, voiced]
      of Object.entries(dakutenMap)
    ) {

      if (kana === voiced) {

        return (
          kanaNumbers[base] +
          "0"
        );

      }

    }


    for (
      const [base, voiced]
      of Object.entries(handakutenMap)
    ) {

      if (kana === voiced) {

        return (
          kanaNumbers[base] +
          "00"
        );

      }

    }


    for (
      const [base, small]
      of Object.entries(smallKanaMap)
    ) {

      if (kana === small) {

        return kanaNumbers[base];

      }

    }


    return "";

  }


  // ========================================
  // 口座番号生成
  // ========================================

  convertButton.addEventListener(
    "click",
    () => {

      if (!inputName.length) {
        return;
      }


      const name =
        inputName.join("");


      const accountNumber =
        inputName
          .map(convertKana)
          .join("");


      numberResult.textContent =
        accountNumber;


      // ------------------------------------
      // 未登録なら口座を作成
      // ------------------------------------

      if (!accounts[accountNumber]) {

        accounts[accountNumber] = {

          name: name,

          balance:
            settings.initialBalance

        };


        saveAccounts();

      }

    }
  );


  // ========================================
  // 口座番号を調べる
  // ========================================

  openNameButton.addEventListener(
    "click",
    () => {

      resetNameScreen();

      showScreen("nameScreen");

    }
  );


  // ========================================
  // ATM
  // ========================================

  let atmInput = "";


  function updateATM() {

    accountInput.textContent =
      atmInput || "---";

  }


  function resetATM() {

    atmInput = "";

    atmMessage.textContent = "";

    updateATM();

  }


  document
    .querySelectorAll("[data-number]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          atmInput +=
            button.dataset.number;

          updateATM();

        }
      );

    });


  atmDelete.addEventListener(
    "click",
    () => {

      atmInput =
        atmInput.slice(0, -1);

      updateATM();

    }
  );


  // ========================================
  // 「ポイントを引き出す」
  //
  // 普通に押す
  // → ATM
  //
  // 5秒長押し
  // → MASTER
  // ========================================

  let holdTimer = null;

  let holdStarted = false;

  let masterActivated = false;


  function cancelHold() {

    if (holdTimer !== null) {

      clearTimeout(holdTimer);

      holdTimer = null;

    }

  }


  openATMButton.addEventListener(
    "pointerdown",
    event => {

      if (
        event.pointerType === "mouse" &&
        event.button !== 0
      ) {

        return;

      }


      holdStarted = true;

      masterActivated = false;


      cancelHold();


      try {

        openATMButton.setPointerCapture(
          event.pointerId
        );

      } catch (error) {

        // setPointerCapture非対応でも続行

      }


      holdTimer =
        setTimeout(
          () => {

            if (!holdStarted) {
              return;
            }


            masterActivated = true;

            holdStarted = false;

            cancelHold();


            openMasterScreen();

          },
          5000
        );

    }
  );


  openATMButton.addEventListener(
    "pointerup",
    event => {

      cancelHold();


      if (masterActivated) {

        masterActivated = false;

        holdStarted = false;

        return;

      }


      if (!holdStarted) {
        return;
      }


      holdStarted = false;


      resetATM();

      showScreen("atmScreen");

    }
  );


  openATMButton.addEventListener(
    "pointercancel",
    () => {

      holdStarted = false;

      cancelHold();

    }
  );


  // ========================================
  // 口座確認
  // ========================================

  let currentAccount = null;

  let currentAccountNumber = "";


  accountConfirm.addEventListener(
    "click",
    () => {

      if (!atmInput) {

        atmMessage.textContent =
          "口座番号を入力してください";

        return;

      }


      if (!accounts[atmInput]) {

        atmMessage.textContent =
          "口座が見つかりません";

        return;

      }


      currentAccountNumber =
        atmInput;


      currentAccount =
        accounts[atmInput];


      openWithdrawScreen();

    }
  );


  // ========================================
  // 引き出し
  // ========================================

  let withdrawAmount = "";


  function openWithdrawScreen() {

    withdrawAmount = "";

    withdrawMessage.textContent = "";


    accountName.textContent =
      currentAccount.name;


    updateBalance();

    updateWithdrawDisplay();


    showScreen(
      "withdrawScreen"
    );

  }


  function updateBalance() {

    if (!currentAccount) {
      return;
    }


    balanceDisplay.textContent =
      Number(
        currentAccount.balance
      ).toLocaleString();

  }


  function updateWithdrawDisplay() {

    withdrawInputDisplay.textContent =
      withdrawAmount || "0";

  }


  // ========================================
  // 引き出しテンキー
  // ========================================

  document
    .querySelectorAll(
      "[data-withdraw]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          withdrawAmount +=
            button.dataset.withdraw;


          withdrawAmount =
            String(
              Number(withdrawAmount)
            );


          updateWithdrawDisplay();

        }
      );

    });


  withdrawDelete.addEventListener(
    "click",
    () => {

      withdrawAmount =
        withdrawAmount.slice(0, -1);

      updateWithdrawDisplay();

    }
  );


  withdrawAll.addEventListener(
    "click",
    () => {

      if (!currentAccount) {
        return;
      }


      withdrawAmount =
        String(
          currentAccount.balance
        );


      updateWithdrawDisplay();

    }
  );


  // ========================================
  // 引き出し実行
  // ========================================

  withdrawConfirm.addEventListener(
    "click",
    () => {

      if (!currentAccount) {
        return;
      }


      const amount =
        Number(withdrawAmount);


      if (
        !Number.isFinite(amount) ||
        amount <= 0
      ) {

        withdrawMessage.textContent =
          "ポイントを入力してください";

        return;

      }


      if (
        amount >
        currentAccount.balance
      ) {

        withdrawMessage.textContent =
          "残高が不足しています";

        return;

      }


      currentAccount.balance -=
        Math.floor(amount);


      accounts[
        currentAccountNumber
      ] =
        currentAccount;


      saveAccounts();


      updateBalance();


      withdrawMessage.textContent =
        Math.floor(amount)
          .toLocaleString() +
        " pt を引き出しました";


      withdrawAmount = "";

      updateWithdrawDisplay();

    }
  );


  // ========================================
  // トップへ戻る
  // ========================================

  document
    .querySelectorAll(".back-home")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          resetNameScreen();

          resetATM();


          currentAccount = null;

          currentAccountNumber = "";

          withdrawAmount = "";


          showScreen(
            "homeScreen"
          );

        }
      );

    });


  // ========================================
  // 引き出し終了
  // ========================================

  returnATM.addEventListener(
    "click",
    () => {

      currentAccount = null;

      currentAccountNumber = "";

      withdrawAmount = "";


      resetATM();

      resetNameScreen();


      showScreen(
        "homeScreen"
      );

    }
  );


  // ========================================
  // MASTER
  // ========================================

  function openMasterScreen() {

    refreshMasterScreen();

    showScreen(
      "masterScreen"
    );

  }


  function refreshMasterScreen() {

    initialBalanceInput.value =
      settings.initialBalance;


    masterSettingMessage.textContent =
      "";


    renderAccountList();

  }


  // ========================================
  // 初期ポイント保存
  // ========================================

  saveInitialBalance.addEventListener(
    "click",
    () => {

      const value =
        Number(
          initialBalanceInput.value
        );


      if (
        !Number.isFinite(value) ||
        value < 0
      ) {

        masterSettingMessage.textContent =
          "正しいポイント数を入力してください";

        return;

      }


      settings.initialBalance =
        Math.floor(value);


      saveSettings();


      masterSettingMessage.textContent =
        "保存しました";

    }
  );


  // ========================================
  // MASTER 口座一覧
  // ========================================

  function renderAccountList() {

    masterAccountList.innerHTML =
      "";


    const entries =
      Object.entries(accounts);


    accountCount.textContent =
      entries.length + "件";


    if (!entries.length) {

      masterAccountList.innerHTML =
        '<div class="no-accounts">' +
        '登録口座はありません' +
        '</div>';

      return;

    }


    entries.forEach(
      ([number, account]) => {

        const row =
          document.createElement("div");


        row.className =
          "master-account";


        // ------------------------------
        // 名前
        // ------------------------------

        const nameElement =
          document.createElement("div");

        nameElement.className =
          "master-account-name";

        nameElement.textContent =
          account.name;


        // ------------------------------
        // 口座番号
        // ------------------------------

        const numberElement =
          document.createElement("div");

        numberElement.className =
          "master-account-number";

        numberElement.textContent =
          number;


        // ------------------------------
        // 残高
        // ------------------------------

        const balanceElement =
          document.createElement("div");

        balanceElement.className =
          "master-account-balance";

        balanceElement.textContent =
          Number(
            account.balance
          ).toLocaleString() +
          " pt";


        // ------------------------------
        // ボタン
        // ------------------------------

        const actions =
          document.createElement("div");

        actions.className =
          "account-actions";


        const addButton =
          document.createElement("button");

        addButton.textContent =
          "付与";


        const editButton =
          document.createElement("button");

        editButton.textContent =
          "残高変更";


        const deleteButtonMaster =
          document.createElement("button");

        deleteButtonMaster.textContent =
          "削除";

        deleteButtonMaster.className =
          "delete-account";


        // ------------------------------
        // ポイント付与
        // ------------------------------

        addButton.addEventListener(
          "click",
          () => {

            const input =
              prompt(
                account.name +
                " に付与するポイント数"
              );


            if (input === null) {
              return;
            }


            const amount =
              Number(input);


            if (
              !Number.isFinite(amount) ||
              amount <= 0
            ) {

              alert(
                "正しいポイント数を入力してください"
              );

              return;

            }


            account.balance +=
              Math.floor(amount);


            accounts[number] =
              account;


            saveAccounts();

            renderAccountList();

          }
        );


        // ------------------------------
        // 残高直接変更
        // ------------------------------

        editButton.addEventListener(
          "click",
          () => {

            const input =
              prompt(
                account.name +
                " の残高を変更",
                account.balance
              );


            if (input === null) {
              return;
            }


            const amount =
              Number(input);


            if (
              !Number.isFinite(amount) ||
              amount < 0
            ) {

              alert(
                "正しい残高を入力してください"
              );

              return;

            }


            account.balance =
              Math.floor(amount);


            accounts[number] =
              account;


            saveAccounts();

            renderAccountList();

          }
        );


        // ------------------------------
        // 口座削除
        // ------------------------------

        deleteButtonMaster.addEventListener(
          "click",
          () => {

            const ok =
              confirm(
                account.name +
                " の口座を削除しますか？"
              );


            if (!ok) {
              return;
            }


            delete accounts[number];


            saveAccounts();

            renderAccountList();

          }
        );


        actions.appendChild(
          addButton
        );

        actions.appendChild(
          editButton
        );

        actions.appendChild(
          deleteButtonMaster
        );


        row.appendChild(
          nameElement
        );

        row.appendChild(
          numberElement
        );

        row.appendChild(
          balanceElement
        );

        row.appendChild(
          actions
        );


        masterAccountList.appendChild(
          row
        );

      }
    );

  }


  // ========================================
  // MASTER終了
  // ========================================

  closeMaster.addEventListener(
    "click",
    () => {

      resetNameScreen();

      resetATM();


      showScreen(
        "homeScreen"
      );

    }
  );


  // ========================================
  // 全データリセット
  // ========================================

  resetAllData.addEventListener(
    "click",
    () => {

      const firstConfirm =
        confirm(
          "すべての口座・残高・設定を削除します。\n\n" +
          "この操作は元に戻せません。\n\n" +
          "本当にリセットしますか？"
        );


      if (!firstConfirm) {
        return;
      }


      const secondConfirm =
        confirm(
          "最終確認です。\n\n" +
          "すべてのデータをリセットしますか？"
        );


      if (!secondConfirm) {
        return;
      }


      accounts = {};


      settings = {
        initialBalance:
          DEFAULT_INITIAL_BALANCE
      };


      saveAccounts();

      saveSettings();


      refreshMasterScreen();


      alert(
        "すべてのデータをリセットしました"
      );

    }
  );


  // ========================================
  // 起動
  // ========================================

  loadData();

  resetNameScreen();

  resetATM();

  showScreen(
    "homeScreen"
  );

});