const fs = require("fs/promises");
const path = require("path");
var Jimp = require("jimp");
const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, filename } = req.file;
  let rightFormat =
    filename.endsWith("jpg") ||
    filename.endsWith("jpeg") ||
    filename.endsWith("png") ||
    filename.endsWith("tiff") ||
    filename.endsWith("gif");

  if (!rightFormat) {
    throw HttpError(
      415,
      "Unsupported Media Type, you can use the following formats: jpg, jpeg, png, bmp, tiff, gif "
    );
  }
  const { _id } = req.user;
  const avatarName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarDir, avatarName);
  await fs.rename(tempUpload, resultUpload);

  const image = await Jimp.read(resultUpload);
  image.resize(250, 250).write(resultUpload);

  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
