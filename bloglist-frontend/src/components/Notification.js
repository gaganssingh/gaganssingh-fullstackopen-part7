import React from "react";

import "./Notification.css";

const Notification = ({ text, style }) => <p className={style}>{text}</p>;

export default Notification;
