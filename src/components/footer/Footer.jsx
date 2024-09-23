import React from "react";

export default function Footer() {
  return (
    <div className="flex md:flex-row flex-col md:justify-evenly items-center gap-11 text-left md:items-center bg-slate-900 py-10 mt-20 text-white child:flex child:flex-col child:gap-5">
      <img className=" w-40 h-40 rounded-lg" src="/images/logo.png" alt="" />
      <ul>
        <li>About</li>
        <li>Privacy and policy</li>
        <li>Accessinility policy</li>
        <li>supply Chains Statement</li>
      </ul>

      <ul>
        <li>Catalogues</li>
        <li>Media</li>
        <li>Rights & Permissions</li>
        <li>Schools & Libraries</li>
      </ul>
    </div>
  );
}
