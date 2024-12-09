const multer = require("multer");
const User = require("../Models/Registerandlogin.model");

const viewUser = (req, res) => {
  const getUser = async () => {
    const data = await User.find();
    res.json(data);
  };

  getUser().catch((err) => {
    console.log(err);
  });
};

const viewUserById = (req, res) => {
  const user = req.user;
  const userId = user._id;

  const getUser = async () => {
    const data = await User.find({ userId });
    res.json(data);
  };

  getUser().catch((err) => {
    console.log(err);
  });
};

const createUser = async (req, res) => {
  try {
    const { userName, profilePic, socialMediaHandle, userBio, emailid } =
      req.body;
    if (!userName || !emailid) {
      return res
        .status(400)
        .json({ message: "userName and emailid are required." });
    }

    const user = new User({
      userName,
      profilePic,
      socialMediaHandle,
      userBio,
      emailid,
    });

    const result = await user.save();

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user.", error });
  }
};

module.exports = createUser;

const getUserBySearch = async (req, res) => {
  console.log(req.query.q, "search");
  const searchVal = req.query.q || "";
  try {
    const plan = await User.find({
      userName: { $regex: searchVal },
    });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'Assets/Images');
	},
	filename: function (req, file, cb) {
		const suffixForImage = Date.now() + Math.round(Math.random() * 1e9) + '-';
		cb(null, suffixForImage + file.originalname.split(' ').join(''));
	},
});

const upload = multer({ storage });

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const dataToUpdate = {
	userName : req.body.userName,
	socialMediaHandle : req.body.socialMediaHandle,
	userBio : req.body.userBio
  }
  
  console.log('updatedData - -- -- -- - -- ' , req)

  // Append the image URL to the request body if a file is provided
//   if (req.file) {
// 	console.log("File --- -- -", req.file)
//     updatedData.profilePic = `http://localhost:5001/Images/${req.file.filename}`;
//   }

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
		return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }


	
    // Update the user data
    const result = await User.findByIdAndUpdate(
		{ _id: userId },
		{ $set: dataToUpdate },
		{ new: true }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(400)
        .json({ status: "Error", message: "No changes were made" });
    }

    res
      .status(200)
      .json({ status: "OK", message: "Successfully updated", user: result });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ status: "Error", message: "Something went wrong" });
  }
};

module.exports = {
  viewUser,
  viewUserById,
  createUser,
  getUserBySearch,
  updateUserById,
};
