import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Tab() {
    return (
        <div>
            <Tabs defaultValue="objectives" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="objectives">Objectives</TabsTrigger>
                    <TabsTrigger value="highlights">Highlights</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>
                <TabsContent value="objectives">Make changes to your account here.</TabsContent>
                <TabsContent value="highlights">Change your password here.</TabsContent>
                <TabsContent value="gallery">Change your password here.</TabsContent>
            </Tabs>
        </div>
    )
}

export default Tab
