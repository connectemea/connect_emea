import Founders from "./components/Founders";
import Interns from "./components/Interns";
import TeamsData from '@/const/data/Teams';

const Team = () => {
  console.log(TeamsData)
  return (
    <div className="py-4 w-limit">
      <h1 className="font-semibold text-2xl flex items-center justify-center">Our Team</h1>

      <Founders InternsData={TeamsData.InternsData} />
      <hr className="max-w-[600px] px-6 mx-auto bg-gray-400 h-[2px]" />
      <div className="">
        <Interns FoundersData={TeamsData.FoundersData} />
      </div>
    </div>
  );
};
export default Team;