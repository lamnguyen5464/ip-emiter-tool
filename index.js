const { exec } = require("child_process");
const https = require("https");

const DELTA_TIME = 1000 * 60 * 15;

setInterval(async () => {
  try {
    const ip = await getIp();
    await emitToHangout(ip);
    console.log("Emitted ", ip);
  } catch (e) {
    console.log(e);
  }
}, DELTA_TIME);

const getIp = () => {
  return new Promise((resolve, reject) => {
    exec(
      "ipconfig getifaddr en0 || ipconfig getifaddr en1",
      (error, stdout, stderr) => {
        if (error || stderr) {
          console.log(`error: ${error?.message || stderr}`);
          reject(error?.message || stderr);
          return;
        }
        resolve(stdout);
      }
    );
  });
};

const emitToHangout = (text) =>
  new Promise((resolve, reject) => {
    const data = JSON.stringify({ text });
    const options = {
      hostname: "chat.googleapis.com",
      path: `/v1/spaces/AAAAGWW6gyE/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=hq-V-1ycDnsLv26y9RqPLnktaKXvME3pr5kN9yNPMz8%3D`,
      port: 443,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      res.on("data", (d) => {
        // process.stdout.write(d);
      });
    });

    req.on("error", (error) => {
      reject(error);
      return;
    });

    req.write(data);
    req.end();
    resolve();
  });
