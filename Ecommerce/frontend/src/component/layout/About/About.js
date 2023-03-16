import React from "react";
import "./About.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Avatar, Button, Typography } from "@mui/material";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/sanzay_khadgi/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/ddkmg6twn/image/upload/v1678888185/avatars/g6cyhzeg3jhjcwnm5i5u.jpg"
              alt="Founder"
            />
            <Typography>Sanjay Khadgi</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>This is a sample wesbite made by Sanjay Khadgi.</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://www.facebook.com/sanzaykhadgi1" target="blank">
              <FacebookIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/sanzay_khadgi/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a href="https://github.com/SanzayKdg" target="blank">
              <GitHubIcon className="githubSvgIcon" />
            </a>
            <a href="https://www.linkedin.com/in/sanjay-khadgi-243623242/" target="blank">
              <LinkedInIcon className="linkedInSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
