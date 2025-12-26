import React from 'react'

const UserCard = ({user}) => {
    console.log("UserCard:", user);
    const {firstName,lastName,skills,email,gender,age} = user || {};

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">
       {firstName} {lastName}
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <h2 className="">
       {age} Yr, {gender == "male"? "M" : "F"}
      </h2>
      <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      <div className="card-actions justify-end my-8">
        <div className="btn btn-secondary bg-blue-400">Ignore</div>
        <div className="btn btn-secondary bg-pink-400">Interested</div>
      </div>
    </div>
  </div>
  )
}

export default UserCard