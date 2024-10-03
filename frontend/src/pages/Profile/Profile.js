import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components';
import { Navbar } from "../../components";
// import { IconComponent } from '../../components';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(true);
  
    const settingButtonClick = () => {
      setIsOpen(!isOpen);
    };
  
    return (
        <>
        <Navbar />
      <div className="profile_page_div">
        <div className="profile_container">
          <div className="profile_pic_and_userName">
            <div className="profile_edit_button_in_profile_page">
              <div className="edit_profile_and_setting_btn_div">
                {/* Logout Button */}
                {/* <IconComponent
                  className="setting_img_in_profile"
                  name="setting"
                  onClick={settingButtonClick}
                /> */}
              </div>
            </div>
            
            {/* Show only Logout button */}
            {isOpen && (
              <div className="settingsModal" color="blue">
                <Link to={'/'}>
                  <Button variant="blue" name="Logout" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      </>
    );
  };
  
  export default Profile;
