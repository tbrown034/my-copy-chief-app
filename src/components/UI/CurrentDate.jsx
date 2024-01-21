import React from "react";

export default function CurrentDate() {
  let today = new Date();
  let dateString = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return <div className="  font-semibold">{dateString}</div>;
}
