

const User = require('../Models/Registerandlogin.model');

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
        const { userName, profilePic, socialMediaHandle, userBio, emailid } = req.body;
        if (!userName || !emailid) {
            return res.status(400).json({ message: "userName and emailid are required." });
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
        res.status(500).json({ message: "An error occurred while creating the user.", error });
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

  const updateUserById = (req, res) => {
	const userId = req.params.id;
	const uReq = req.body;
  
	const getUser = async () => {
	  await User.findById(userId)
		.then((_) => {
		  User.updateOne({ _id: userId }, { $set: uReq })
			.then((_) => {
			  res.json({ status: "OK", message: "Successfully updated" });
			})
			.catch((err) => {
			  res.json({ status: "Err", message: "Something went wrong" });
			  console.log(err);
			});
		})
		.catch((err) => {});
	};
  
	getUser().catch((err) => {
	  res.json({ message: "User Not Found" });
	});
  };

module.exports = {
	viewUser,
	viewUserById,
	createUser,
	getUserBySearch,
	updateUserById,
};
