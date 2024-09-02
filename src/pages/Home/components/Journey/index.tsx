import Timeline from "./Timeline";

interface Event {
  title: string;
}
function Journey() {
  const eventsData: Event[] = [
    { title: "Start" },
    { title: "In Progress" },
    { title: "Milestone 1" },
    { title: "In Progress" },
    { title: "Milestone 2" },
    { title: "In Progress" },
    { title: "End" },
  ];

  return (
    <section className="flex flex-col gap-4 p-4 mx-auto my-4">
      <h1 className="max-w-[500px] font-semibold text-xl sm:text-2xl md:text-3xl text-center  mx-auto my-4">
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
