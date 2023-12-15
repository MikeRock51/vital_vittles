import { useUserStore } from "../../stateProvider/authStore";
import { timeAgo } from "../../utils/Utilities";

const BASE_URL = process.env.REACT_APP_API_URL;

function UserChat({chatInfo}) {
  const { currentUser } = useUserStore();

  return (
    <div className="col-start-1 sm:col-start-3 col-end-13 rounded-lg p-3">
      <div className="flex flex-row-reverse items-center justify-start">
        <div className="chatAvatarContainer">
          <img
            className="h-full w-full rounded-full object-cover"
            src={`${BASE_URL}/users/dp/${currentUser?.id}`}
            alt={`${currentUser?.firstname}'s avatar`}
          />
        </div>
        <div className="relative mr-3 rounded-xl bg-primary-40 px-4 py-2 text-left text-sm md:text-base md:leading-8 shadow">
          <div>
            {chatInfo.content}
          </div>
          <div className="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
            {chatInfo.updatedAt && timeAgo(chatInfo.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChat;
