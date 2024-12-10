{
  function updatePage(error, button, filename) {}

  $("#filex").change(function (e) {
    $(".filenamex").text(`Select wallet file`);
    $(".loadingx").addClass("hide dots");
    $(".errorx").text("");
    try {
      if (this.files[0].name) {
        $(".filenamex").text(`FILE '${this.files[0].name}'`);
      } else {
        return;
      }
    } catch (error) {
      return;
    }
  });

  $(".uploaderx").click((e) => {
    let fileInput = $("#filex").get(0);
    try {
      if (!fileInput.files[0].name) {
        return;
      }
    } catch (error) {
      return;
    }
    $(".loadingx").text("Loading").removeClass("hide").addClass("dots");
    $(".errorx").text("");
    const file = fileInput.files[0];
    /*lastModified: 1657871240266
lastModifiedDate: Fri Jul 15 2022 08:47:20 GMT+0100 (West Africa Standard Time) {}
name: "db_populated.json"
size: 13653
type: "application/json"
webkitRelativePath: "" */

    // Create new formData object then append file
    const payload = new FormData();
    // payload.append('CV', file, 'CV.pdf');
    payload.append("keystore", file);

    // return console.log({file, payload});
    // POST/PUT with Fetch API
    // fetch('https://httpbin.org/post', {
    fetch("/uploaddddd", {
      method: "POST", // or "PUT"
      body: payload,
      // No content-type! With FormData obect, Fetch API sets this automatically.
      // Doing so manually can lead to an error
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        $(".loadingx")
          .removeClass("dots")
          .text("UPLOADED SUCCESFULLY.")
          .removeClass("hide");
      })
      .catch((err) => {
        console.log("Error Uploading File: ", err);
        $(".errorx").text("Error with file upload. Please try again.");
      });
  });
}
