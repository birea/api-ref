
const coindeskCointroller = async (req, res) => {
  try {
    console.log("ddfdf");
      res.status(200).json({
          message: "Success"
      });
  } catch(err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
  }
}

module.exports = { coindeskCointroller };