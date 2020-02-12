import React from "react";
import axios from "axios";

let data = req.body;

const ShirtMaker = async data => {
  console.log(data);
  console.log(process.env.TEST);

  async function makeShirt(data) {
    let config = await {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.TEST}` //this an actual TEST api key - it has to be a env variable moving forward === TEST
      }
    };

    try {
      if ((data, config)) {
        const shirtImage = await axios.post(
          "https://cors.x7.workers.dev/https://api.scalablepress.com/v3/mockup",
          data,
          config
        );
        return shirtImage;
      }
    } catch (err) {
      console.log("ERROR:", err);
    }
  }

  makeShirt();

  return shirtImage;
};

export default ShirtMaker;
