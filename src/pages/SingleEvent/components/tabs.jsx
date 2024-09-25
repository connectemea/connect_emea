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

const Highlights = ({ data }) => {
    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Highlights</h2>
            {/* <div 
                className="highlights" 
                dangerouslySetInnerHTML={{ __html: data }} 
            /> */}
            {data}
        </div>
    );
};

const Objectives = ({ data }) => {
    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Objectives</h2>
            {data}
        </div>
    );
};

const Tab = ({ about }) => {
    return (
        <div className="p-4 bg-white  w-full">
            <Tabs defaultValue="objectives" className=" p-2">
                <TabsList className="max-w-[400px]">
                    <TabsTrigger value="objectives" className="text-black">Objectives</TabsTrigger>
                    <TabsTrigger value="highlights" className="text-black">Highlights</TabsTrigger>
                    {/* <TabsTrigger value="gallery" className="text-black">Gallery</TabsTrigger> */}
                </TabsList>
                <TabsContent value="objectives">
                    <Objectives data={about.objectives} />
                </TabsContent>
                <TabsContent value="highlights">
                    <Highlights data={about.highlights} />
                </TabsContent>
                {/* <TabsContent value="gallery">
                    <Gallery />
                </TabsContent> */}
            </Tabs>
        </div>
    );
};

export default Tab;
