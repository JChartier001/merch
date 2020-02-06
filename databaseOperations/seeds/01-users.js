exports.seed = function(knex) {
  return knex("users").insert([
    {
      first_name: "Merch",
      last_name: "Dropper",
      username: "merchdropperadmin",
      password: "anthill",
      seller: true,
      stripe_account: "MerchDropperAdmin",
      address1: "7822 Myriad Drive",
      address2: "-",
      city: "Denver",
      state: "Colorado",
      zip_code: 80204,
      country: "USA",
      phone: 2165274556,
      email: "merchdropper20@gmail.com",
      billing_address: "7822 Myriad Drive",
      billing_city: "Denver",
      billing_zip_code: 80204,
      billing_country: "USA",
      shipping_address: "7822 Myriad Drive",
      shipping_city: "Denver",
      shipping_zip_code: 80204,
      shipping_country: "USA",
      date_created: 1529644667834,
      date_updated: 1529644667834,
      support_pin: "HRYI7820"
    }
  ]);
};
