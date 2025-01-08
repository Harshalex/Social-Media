import React from "react";
import userimg from "../assets/userimg.jpg";

function Avatar({ src }) {
  return (
    <div>
      <img
        className="h-10 w-12 rounded-full object-cover"
        src={src ? src : userimg}
        alt="profile"
      />
    </div>
  );
}

export default Avatar;
