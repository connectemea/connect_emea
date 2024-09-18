import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Gallery = () => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg ">
            {[...Array(6)].map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-200 h-32 rounded-lg w-[200px] mx-auto flex items-center justify-center"
                >
                    <span className="text-gray-500 px-4">Image {index + 1}</span>
                </div>
            ))}
        </div>
    );
};

const Highlights = () => {
    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Highlights</h2>
            <ul className="list-disc list-inside text-gray-700">
                <li className="mb-2">Achieved record-breaking sales in Q2 2024.</li>
                <li className="mb-2">Launched a new product line with a 20% market share increase.</li>
                <li className="mb-2">Expanded into three new international markets.</li>
                <li className="mb-2">Received industry award for innovation in technology.</li>
                <li className="mb-2">Partnered with leading influencers for a successful marketing campaign.</li>
            </ul>
        </div>
    );
};

const Objectives = () => {
    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Objectives</h2>
            <ul className="list-disc list-inside text-gray-700">
                <li className="mb-2">Enhance user experience by optimizing website performance.</li>
                <li className="mb-2">Increase customer engagement through targeted marketing campaigns.</li>
                <li className="mb-2">Develop and launch two new features in the next quarter.</li>
                <li className="mb-2">Improve customer support response time by 30%.</li>
                <li className="mb-2">Expand product offerings to include new categories based on market demand.</li>
            </ul>
        </div>
    );
};

const Tab = () => {
    return (
        <div className="p-4 bg-white  w-full">
            <Tabs defaultValue="objectives" className=" p-2">
                <TabsList className="max-w-[400px]">
                    <TabsTrigger value="objectives" className="text-black">Objectives</TabsTrigger>
                    <TabsTrigger value="highlights" className="text-black">Highlights</TabsTrigger>
                    <TabsTrigger value="gallery" className="text-black">Gallery</TabsTrigger>
                </TabsList>
                <TabsContent value="objectives">
                    <Objectives />
                </TabsContent>
                <TabsContent value="highlights">
                    <Highlights />
                </TabsContent>
                <TabsContent value="gallery">
                    <Gallery />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Tab;
