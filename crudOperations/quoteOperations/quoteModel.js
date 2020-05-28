const axios = require("axios");

module.exports = {
  quoteMaker
};

async function quoteMaker(data) {
  let config = await {
    'headers': {
      'Authorization': 'Basic bWVyY2hkcm9wcGVyMjBAZ21haWwuY29tOnRlc3RfZUIza2JJTThFRG5OdHEwenBSSU5fZw==',
      'Content-Type': 'application/json'
    },
  };
  if ((data, config)) {
    console.log(data, "to SP")
    const quote = await axios.post(
      "https://api.scalablepress.com/v2/quote",
      data,
      config
    )
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err, "")
    })
    return quote;
    console.log(quote, "quote")
  }
}
