import { useState, useEffect } from "react";
import { useUserStore } from "../stateProvider/authStore";
import { getTimeOfDay } from "../utils/Utilities";
import FileUploader from "../components/FileUploader";
import { UploadUserDP } from "../utils/DpUploaders";

const BASE_URL = process.env.REACT_APP_API_URL;

function Profile() {
  const { currentUser } = useUserStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  
  return (
    <div className="mt-24 px-4 sm:px-12 md:px-20">
      <div className="sm:grid sm:grid-cols-2">
        <div className="mx-auto text-left">
          <h2 className="text-2xl sm:text-5xl">
            Good {getTimeOfDay()} {currentUser?.firstname}!
          </h2>
        </div>
        <div className="my-4 sm:m-auto">
          <img
            className="mx-auto h-28 w-28 rounded-full xs:h-36 xs:w-36 md:h-48 md:w-48 object-cover"
            src={`${BASE_URL}/users/dp/${currentUser.id}`}
            alt=""
          />
          <button onClick={() => setModalIsOpen(!modalIsOpen)} className="text-primary-600 mt-4">Update Profile Picture</button>
        </div>
        <div className="">
          {modalIsOpen && <FileUploader Uploader={UploadUserDP} modalIsOpen={{modalIsOpen}} setModalIsOpen={setModalIsOpen}/>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
