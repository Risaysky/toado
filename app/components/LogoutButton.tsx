import { signout } from "../actions";

export default function LogoutButton() {
  return (
    <button
      onClick={signout}
      className="text-md w-20 rounded-md bg-gray-700 py-1 text-gray-300 transition-all hover:cursor-pointer active:bg-gray-700/50 active:text-gray-300/50"
    >
      Log out
    </button>
  );
}
