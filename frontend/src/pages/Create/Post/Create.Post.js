import React, { useEffect, useState } from "react";
import { InputField } from "../../../components";
import { Button } from "../../../components";
import TextArea from "../../../components/TextArea/TextArea";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePost() {
  const [token, setToken] = useState();

  const initialErrorValues = {
    imageError: "",
    locationError: "",
  };
  const locationRegex = /^[a-z ,.'-]+$/i;

  const [formValues, setFormValues] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(initialErrorValues);
  const [isImageValidated, setIsImageValidaed] = useState(false);
  const [isLocationValidated, setIsLocationValidated] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem("user")));
    // setFormValues(JSON.parse(localStorage.getItem("user")));
    setToken(localStorage.getItem("token"));
  }, []);

  const onImageChange = (e) => {
    const imageUrl = validateImage(URL.createObjectURL(e.target.files[0]));
    setImage(imageUrl);
    setFormValues((prevState) => ({
      ...prevState,
      postImage: validateImage(e.target.files[0]),
    }));
  };
  // validate Uploaded image
  const validateImage = (value) => {
    value === " "
      ? setErrorMessage((prevState) => ({
          ...prevState,
          imageError: "please select an Image!!",
        }))
      : setErrorMessage((prevState) => ({
          ...prevState,
          imageError: "",
        }));
    setIsImageValidaed(true);
    return value;
  };

  const handleChangeLocation = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      location: validateLocation(e.target.value),
    }));
  };

  // validate entered location
  const validateLocation = (value) => {
    if (value === "") {
      setErrorMessage((prevState) => ({
        ...prevState,
        locationError: "please enter valid input!!",
      }));
    } else if (!locationRegex.test(value)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        locationError: "Location sould not contain numbers!!",
      }));
    } else {
      setErrorMessage((prevState) => ({
        ...prevState,
        locationError: "",
      }));
    }
    setIsLocationValidated(true);
    return value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check all fields are validated and no error found, then create post

    const formData = new FormData();
    formData.append("userName", formValues.userName);
    formData.append("postImage", formValues.postImage);
    formData.append("location", formValues.location);
    formData.append("description", formValues.description);
    try {
      if (isImageValidated && isLocationValidated) {
        if (
          errorMessage.locationError === "" &&
          errorMessage.imageError === "" &&
          image !== ""
        ) {
          await axios
            .post("/post/create", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            })
            .then(function (response) {
              toast.success(response);
            })
            .catch((err) => {
              console.log("err", err);
              toast.error(err.message);
            });

          setIsSubmit(true);
        } else {
          setIsSubmit(false);
          toast.error("Invalid data entered!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        setIsSubmit(false);
        toast.error("Please add Image and Location!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      navigate("/profile");
      toast.success("Post Created successfully!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSubmit, navigate]);

  return (
    <div className="create_post_outer_div">
      <div className="title_for_create_post">Create New Post</div>

      <form onSubmit={handleSubmit}>
        <div className="createpost-form">
          <div className="photo-select">
            <InputField
              type="file"
              name="postImage"
              id="photo"
              accept="image/png, image/gif, image/jpeg"
              error={errorMessage.imageError}
              handleChange={onImageChange}
              label="Select a photo"
            />

            {image ? (
              <img
                className="post-image"
                src={image}
                id="target"
                alt="preview"
                name="postImage"
              />
            ) : null}
          </div>

          <div className="post-info">
            <div className="input-container ic2">
              <InputField
                type="text"
                name="location"
                value={formValues.location}
                error={errorMessage.locationError}
                handleChange={handleChangeLocation}
                label="Location"
              />
            </div>

            <div className="input-container-for-post ic2">
              <TextArea
                style={{
                  height: "30vh",
                }}
                row={5}
                name="description"
                value={formValues.description}
                handleChange={handleChange}
                label="Description of place"
              />
            </div>

            <div className="feed_container-latest_trip_div-button">
              <Button
                type="submit"
                onSubmit={handleSubmit}
                variant="blue"
                name="POST"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
