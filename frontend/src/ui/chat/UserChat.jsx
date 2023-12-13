import { useUserStore } from "../../stateProvider/authStore";

const BASE_URL = process.env.REACT_APP_API_URL;

function UserChat() {
  const { currentUser } = useUserStore();

  return (
    <div className="col-start-1 sm:col-start-3 col-end-13 rounded-lg p-3">
      <div className="flex flex-row-reverse items-center justify-start">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
          <img
            className="h-full w-full rounded-full object-cover"
            src={`${BASE_URL}/users/dp/${currentUser.id}`}
            alt={`${currentUser.firstname}'s avatar`}
          />
        </div>
        <div className="relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-left text-sm shadow">
          <div>
            Hi Yishu! Can you tell me which is the healthier option between
            butter and Mayonnaise?
          </div>
          <div className="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
            2 mins ago
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChat;
