const { exec } = require("child_process");
const axios = require("axios");

exec(
  "ipconfig getifaddr en0 || ipconfig getifaddr en1",
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    axios({
      url: "https://chat.googleapis.com/v1/spaces/AAAAGWW6gyE/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=hq-V-1ycDnsLv26y9RqPLnktaKXvME3pr5kN9yNPMz8%3D",
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { stdout },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      }),
      console.log(`stdout: ${stdout}`);
  }
);
