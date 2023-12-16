import { useState, useEffect } from "react";
import { useUserStore } from "../stateProvider/authStore";
import { getTimeOfDay } from "../utils/Utilities";
import FileUploader from "../components/FileUploader";
import { UploadUserDP } from "../utils/DpUploaders";

function Profile() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { currentUser } = useUserStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="mt-24 px-4 sm:px-12 md:px-20">
      <div className="sm:grid sm:grid-cols-2">
      <div className="flex items-center justify-center h-screen">
  <div className="mx-auto text-left p-10 bg-orange-700 h-2/3 text-white" >
    <h2 className="text-2xl sm:text-5xl py-5" >
      Good {getTimeOfDay()} {currentUser?.firstname} {currentUser?.lastname}!
    </h2>
    <p style={{ fontWeight: 'bold' }}>First Name: {currentUser?.firstname}</p>
    <p style={{ fontWeight: 'bold' }}>Last Name: {currentUser?.lastname}</p>
    <p style={{ fontWeight: 'bold' }}>Username: {currentUser?.username}</p>
  </div>
</div>

        <div className="my-4 sm:m-auto">
          <img
            className="mx-auto h-28 w-28 rounded-full xs:h-36 xs:w-36 md:h-48 md:w-48 object-cover"
            src={`${BASE_URL}/users/dp/${currentUser.id}`}
            alt=""
          />
          <button onClick={() => setModalIsOpen(!modalIsOpen)} className="text-primary-600 mt-4">
            Update Profile Picture
          </button>
        </div>
        <div className="">
          {modalIsOpen && <FileUploader Uploader={UploadUserDP} modalIsOpen={{ modalIsOpen }} setModalIsOpen={setModalIsOpen} />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
