import { EventsBG, PlacementBG, MembersBG } from "@/assets/avatars";

function Chapter() {
  return (
    <section className="flex flex-col gap-4 p-4 my-10">
      <h1 className=" font-semibold text-center my-4 text-[28px] sm:text-[38px]">
        Why you should join{" "}
        <span className="text-orange-500 block">Connect</span>
      </h1>
      <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-20 md:gap-10 mx-auto ">
        <div className="col-span-2">
          <ul className="space-y-4 list-disc list-inside px-4 ">
            <li className="">
              <strong className="font-semibold text-xl md:text-2xl">
                Work on Real Projects:
              </strong>
              <span className="ml-5 block text-md md:text-lg">
                Get hands-on experience with collaborative projects that solve
                real-world problems. Perfect for rebels who want to make an
                impact now.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-xl md:text-2xl">
                Free Skill Development:
              </strong>
              <span className="ml-5 block text-md md:text-lg">
                Access a wide range of resources to build new skills across
                different fields—completely free. Because your passion shouldn't
                come with a price tag.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-xl md:text-2xl">
                Network with Peers:
              </strong>{" "}
              <span className="ml-5 block text-md md:text-lg">
                Connect with supportive, like-minded friends who share your
                drive and ambition. Build a community that fuels your passion.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-xl md:text-2xl">
                Free Mentorship:
              </strong>
              <span className="ml-5 block text-md md:text-lg">
                {" "}
                Learn directly from industry pros who’ve been where you want to
                go. Gain insights, advice, and guidance without spending a dime.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-xl md:text-2xl">
                Leadership Opportunities:
              </strong>
              <span className="ml-5 block text-md md:text-lg">
                {" "}
                Step up and take on leadership roles to sharpen your management
                and organizational skills. Show the world what you’re capable
                of.
              </span>
            </li>
          </ul>
        </div>

        <div className="relative flex h-full items-center justify-center">
          <div className="flex relative items-end gap-6 md:-mt-20 mb-24 md:mb-0">
            <div className="min-h-64 w-40 bg-gray-400 border border-black rounded-full flex items-center justify-center overflow-hidden relative">
              <img
                src={MembersBG}
                alt=""
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <span className="relative text-white mx-auto text-center p-2">
                <h1 className="text-3xl font-bold">100+</h1>
                <p className="font-semibold text-xl">Members</p>
              </span>
            </div>
            <div className="min-h-52 w-36 bg-gray-400 border border-black rounded-full flex items-center justify-center overflow-hidden relative">
              <img
                src={EventsBG}
                alt=""
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <span className="relative text-white mx-auto text-center p-2">
                <h1 className="text-3xl font-bold">40+</h1>
                <p className="font-semibold text-xl">Events</p>
              </span>
            </div>
            <div className="min-h-52 w-36 bg-gray-400 border border-black rounded-full flex items-center justify-center absolute -bottom-32 left-24 overflow-hidden">
              <img
                src={PlacementBG}
                alt=""
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <span className="relative text-white mx-auto text-center p-2">
                <h1 className="text-3xl font-bold">20+</h1>
                <p
                  className="font-semibold text-xl"
                  style={{ overflowWrap: "anywhere" }}
                >
                  Placements
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter;
