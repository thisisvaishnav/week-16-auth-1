const axios = require("axios");

async function main() {
  try {
    // for post req the first argument should be url and second should be your body and then headers
    // for get you send query parameter via like  and never send body
    const response = await axios.post(
      "https://httpdump.app/dumps/29b68bd6-5a14-4083-9a81-53e25d5fa59a",
      { username: "vaishnav", password: "12345678" },
      {
        headers: {
          Authorization: "Bearer 123",
        },
      },
    );

    console.log(response.data);
  } catch (err) {
    console.log(err.message);
  }
}

main();
