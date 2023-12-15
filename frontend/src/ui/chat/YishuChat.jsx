import { timeAgo } from "../../utils/Utilities";

function YishuChat({ chatInfo }) {
  return (
    <div className="col-start-1 col-end-8 sm:col-end-11 rounded-lg p-3">
      <div className="flex flex-row items-center">
        <div className="chatAvatarContainer">
          <img
            className="relative h-auto"
            src="/assets/chef.svg"
            alt="Chef illustration icon"
          />
        </div>
        <div className="relative ml-3 rounded-xl bg-indigo-100 px-4 py-2 text-left text-sm md:text-base md:leading-8 shadow">
          <div>
            {chatInfo.content}
          </div>
          <div className="absolute bottom-0 left-0 ml-1 -mb-5 mr-2 text-xs text-gray-500">
            {chatInfo.updatedAt && timeAgo(chatInfo.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YishuChat;
