import { useState, useEffect } from "react";
import { useUserStore } from "../stateProvider/authStore";
import { getTimeOfDay } from "../utils/Utilities";
import FileUploader from "../components/FileUploader";
import { UploadUserDP } from "../utils/DpUploaders";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTag, faIdBadge, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

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
    

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <p style={{ fontWeight: 'bold', marginBottom: '4px', color: 'white', fontSize: '30px' }}>
    <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
    First Name: <span style={{ marginLeft: '10px' }}>{currentUser?.firstname}</span>
  </p>

  <p style={{ fontWeight: 'bold', marginBottom: '4px', color: 'white', fontSize: '30px' }}>
    <FontAwesomeIcon icon={faUserTag} style={{ marginRight: '10px' }} />
    Last Name: <span style={{ marginLeft: '10px' }}>{currentUser?.lastname}</span>
  </p>

  <p style={{ fontWeight: 'bold', marginBottom: '4px', color: 'white', fontSize: '30px' }}>
    <FontAwesomeIcon icon={faIdBadge} style={{ marginRight: '10px' }} />
    Username: <span style={{ marginLeft: '10px' }}>{currentUser?.username}</span>
  </p>

  <p style={{ fontWeight: 'bold', marginBottom: '4px', color: 'white', fontSize: '30px' }}>
    <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />
    Email: <span style={{ marginLeft: '10px' }}>{currentUser?.email}</span>
  </p>

  <p style={{ fontWeight: 'bold', marginBottom: '4px', color: 'white', fontSize: '30px' }}>
    <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px' }} />
    Phone: <span style={{ marginLeft: '10px' }}>{currentUser?.phone}</span>
  </p>
</div>

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
