import ContactImg from "@/assets/avatars/Queries.png";
import { QueriesForm } from "./Form";

function Contact() {
  return (
    <div className="flex text-center flex-col my-10 p-4">
      <div className="flex bg-white rounded-3xl shadow-xl shadow-black/20 border overflow-hidden mx-auto w-fit md:w-full">
        <div className="w-[45%] bg-gray-500 hidden md:block">
          <img
            src={ContactImg}
            alt="Queries"
            className="object-cover h-full w-full "
          />
        </div>
        <div className=" max-w-md p-6 mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-left">Any Queries</h2>
          <p className="text-gray-600 mb-6 text-left">
            Let's align our constellations! Reach out and let the magic of
            collaboration illuminate our skies.
          </p>
          <div className="space-y-4">
            <QueriesForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
