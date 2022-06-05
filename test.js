document.dispatchEvent(
  new CustomEvent("click-with-data", {
    data: JSON.parse({
      ID: "62958078068c9b095c3f1b0c",
      Name: "Kate Miranda",
      Email: "katemiranda@nurali.com",
      Role: "マスター管理者",
      LastLogin: 1653964920738,
      Img: "https://res.cloudinary.com/ngo-minh-phat/image/upload/v1653964510/SmartPos_Test/avt_g7urwp.svg",
      Type: "existing",
    }),
  })
);
