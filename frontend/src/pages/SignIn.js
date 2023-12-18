import SignInForm from "../components/SignInForm"
import { useUserStore } from "../stateProvider/authStore"

function SignInPage() {
  const { noSession } = useUserStore();

  console.log(noSession);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      {noSession && <h2 className="text-[red]">You do not have an active session, please log in to continue...</h2>}
      <SignInForm />
    </div>
  )
}

export default SignInPage
