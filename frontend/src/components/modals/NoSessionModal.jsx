import Modal from "react-modal"
import { useUserStore } from "../../stateProvider/authStore"

function NoSessionModal() {
    const { noSession } = useUserStore();
  return (
    <Modal
      isOpen={noSession}
    //   onRequestClose={() => setCreating(false)}
      contentLabel="No Session Modal"
      className="chatModal"
      appElement={document.getElementById("root")}
      overlayClassName="chatModalOverlay"
    >
        <button className="p-2">Sign In</button>
    </Modal>
  )
}

export default NoSessionModal
