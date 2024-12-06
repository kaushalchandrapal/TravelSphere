
import React, { useState } from "react";
import { Button, InputField } from "..";
import "../EditProfile/EditProfile.styles.css";
import { useForm } from "react-hook-form";

const EditProfilePopup = (props) => {
  const {formValues,setFormValues} = props;
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors }
  // } = useForm();

  const [avatar, setAvatar] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const formData = () => {
    props.setTrigger(false);
  };
  return props.trigger ? (
    // <form onSubmit={handleSubmit}>
      <div className="profile">
        <div className="profile-inner">
          <div className="profile-button-close">
            <div className="">
              <span className="edit-profile-title">Edit Profile</span>
            </div>

            <Button
              className="close-btn"
              variant="transparent"
              name="Close"
              onClick={() => props.setTrigger(false)}
            />
          </div>
          <div className="avatar-container">
            <label htmlFor="avatar-input">
              <img src={avatar || "/Images/shani.jpg"} alt="avatar" />
            </label>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setAvatar(URL.createObjectURL(event.target.files[0]))
              }
            />
          </div>
          <div className="profile-input-list">
            <InputField
              label="Name"
              id="name"
              type="text"
              name="name"
              handleChange={handleChange}
              // {...register("name", { required: true })}
            />
            {/* {errors.name && <span className="error">This field is required</span>} */}
            <InputField
              label="Location"
              id="location"
              type="text"
              name="location"
              handleChange={handleChange}
			  // {...register("location", { required: true })}
            />
			{/* {errors.location && <span className="error">This field is required</span>} */}
            <InputField
              label="Social Media"
              id="socialMedia"
              type="text"
              name="socialMedia"
              handleChange={handleChange}
			  // {...register("socialMedia", { required: true })}
            />
			{/* {errors.socialMedia && <span className="error">This field is required</span>} */}
            <InputField
              label="Bio"
              id="bio"
              type="text"
              name="bio"
              handleChange={handleChange}
			  // {...register("bio", { required: true })}
            />
			{/* {errors.bio && <span className="error">This field is required</span>} */}
          </div>
          <div className="profile-save-button">
            <Button
              variant="blue"
              name="Save"
              // type="submit"
                onClick={(e) => {
                  // eslint-disable-next-line no-undef
                  handleSubmit(e)
                  formData()}}
            />
          </div>
          {props.children}
        </div>
      </div>
    // </form>
  ) : (
    ""
  );
};

export default EditProfilePopup;






// import React, { useState } from "react";
// import { Button, InputField } from "..";
// import "../EditProfile/EditProfile.styles.css";
// import { useForm } from "react-hook-form";
// import { useFormik } from "formik";

// const EditProfile = (props) => {
//   const {
//     formState: { errors },
//     handleSubmit,
//     control,
// 	register
//   } = useForm();
//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   const initialValues = {
//     name: "",
//     location: "",
//     socialMedia: "",
//     bio: "",
//     // email: "",
//   };

//   const [avatar, setAvatar] = useState("");
//   const [formValues, setFormValues] = useState(initialValues);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//     console.log(formValues)
//   };

//   const formData = () => {
//     props.setTrigger(false);
//   };
  
//   return props.trigger ? (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="profile">
//         <div className="profile-inner">
//           <div className="profile-button-close">
//             <div className="">
//               <span className="edit-profile-title">Edit Profile</span>
//             </div>

//             <Button
//               className="close-btn"
//               variant="transparent"
//               name="Close"
//               onClick={() => props.setTrigger(false)}
//             />
//           </div>
//           <div className="avatar-container">
//             <label htmlFor="avatar-input">
//               <img src={avatar || "/Images/shani.jpg"} alt="avatar" />
//             </label>
//             <input
//               id="avatar-input"
//               type="file"
//               accept="image/*"
//               onChange={(event) =>
//                 setAvatar(URL.createObjectURL(event.target.files[0]))
//               }
//             />
//           </div>
//           <div className="popup-input-list">
//             <InputField
//               label="Name"
//               // id="name"
//               type="text"
//               // name="name"
//               handleChange={handleChange}
//               {...register("name", { required: true })}
//             />
//             {errors.name && <span className="error">This field is required</span>}
//             <InputField
//               label="Location"
//               id="location"
//               type="text"
//               name="location"
//               handleChange={handleChange}
// 			  {...register("location", { required: true })}
//             />
// 			{errors.location && <span className="error">This field is required</span>}
//             {/* <InputField
//               label="Social Media"
//               id="socialMedia"
//               type="text"
//               name="socialMedia"
//               handleChange={handleChange}
// 			  {...register("socialMedia", { required: true })}
//             />
// 			{errors.socialMedia && <span className="error">This field is required</span>}
//             <InputField
//               label="Bio"
//               id="bio"
//               type="text"
//               name="bio"
//               handleChange={handleChange}
// 			  {...register("bio", { required: true })}
//             />
// 			{errors.bio && <span className="error">This field is required</span>} */}
//           </div>
//           <div className="popup-save-button">
//             <Button
//               variant="blue"
//               name="Save"
//               type="submit"
//               //   onClick={formData}
//             />
//           </div>
//           {props.children}
//         </div>
//       </div>
//     </form>
//   ) : (
//     ""
//   );
// };

// export default EditProfile;