const mongoose = require("mongoose");
var findOrCreate = require("mongoose-findorcreate");

if (
  typeof process.env.DATABASE != "undefined" &&
  typeof process.env.DATABASE_PASSWORD != "undefined"
) {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

let UserSchema = new mongoose.Schema({
  name: String,
  userId: String,
});

UserSchema.plugin(findOrCreate);

const SocialUser = mongoose.model("SocialUser", UserSchema);
module.exports = SocialUser;