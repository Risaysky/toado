import { ClipLoader } from "react-spinners";

export default function loading() {
  return (
    <div className="flex justify-center pt-72">
      <ClipLoader color="#e5e7eb" />
    </div>
  );
}
