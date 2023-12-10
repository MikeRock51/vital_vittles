import { useState } from "react";
import { useUserStore } from "../stateProvider/authStore";
import { getTimeOfDay } from "../utils/Utilities";
import FileUploader from "../components/FileUploader";

const BASE_URL = process.env.REACT_APP_API_URL;

function Profile() {
  const { currentUser, authToken } = useUserStore();
  const [ showUploader, setShowUploader ] = useState(false);
  
  return (
    <div className="mt-24 px-4 sm:px-12">
      <div className="xs:grid xs:grid-cols-3">
        <div className="m-auto text-left">
          <h2 className="text-2xl sm:text-5xl">
            Good {getTimeOfDay()} {currentUser.firstname}!
          </h2>
        </div>
        <div className="m-auto">
          <img
            className="mx-auto h-28 w-28 rounded-full xs:h-36 xs:w-36 md:h-48 md:w-48"
            src={`${BASE_URL}/users/dp/${currentUser.id}`}
            alt=""
          />
          <button onClick={() => setShowUploader(!showUploader)} className="text-primary-600 mt-4">Update Profile Picture</button>
        </div>
        <div className="h-[300px]">
          {showUploader && <FileUploader />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
