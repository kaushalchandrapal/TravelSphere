

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
	const userId = parseInt(req.params.id);

	const getUser = async () => {
		const data = await User.find({ userId });
		res.json(data);
	};

	getUser().catch((err) => {
		console.log(err);
	});
};

const createUser = (req, res) => {
	const userId = req.body.userId;
	const userName = req.body.userName;
	const profilePic = req.body.profilePic;
	const socialMediaHandle = req.body.socialMediaHandle;
	const userBio = req.body.userBio;
	const emailid = req.body.emailid;

	const saveUser = async () => {
		const user = new User({
			userId,
			userName,
			profilePic,
			socialMediaHandle,
			userBio,
			emailid,
		});
		const result = await user.save();
		res.json(result);
	};
	saveUser();
};

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
