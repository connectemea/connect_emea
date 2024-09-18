import Timeline from "./Timeline";

interface Event {
  title: string;
}
function Journey() {
  const eventsData: Event[] = [
    { title: "Welcome" },
    { title: "Explore" },   // Milestone 1
    { title: "Build" },     // Milestone 2
    { title: "Learn" },     // In Progress
    { title: "Refine" },    // Milestone 3
    { title: "Lead" },      // Milestone 4
    { title: "Graduate" },
  ];
  
  

  return (
    <section className="flex flex-col gap-4 p-4 mx-auto my-4">
      <h1 className="max-w-[600px] font-semibold text-[25px] sm:text-[42px] text-center  mx-auto my-4">
        Your journey of growth right
        <br /> at your campus!
      </h1>
      <div className="mx-auto">
        <Timeline events={eventsData} />
      </div>
    </section>
  );
}

export default Journey;
