"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ImagePreview({
    src,
    alt = "Image",
    size = "h-40 w-40", // default size (Tailwind classes)
    modalSize = "max-w-3xl", // default modal max size
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={`relative group overflow-hidden rounded-lg ${size}`}>
                <img
                    draggable={false} // prevent dragging
                    onDragStart={(e) => e.preventDefault()}
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay + Button */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="bg-white text-black rounded-full shadow-lg hover:bg-gray-200"
                        onClick={() => setOpen(true)}
                    >
                        <Eye className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className={`p-0 border-0 shadow-lg ${modalSize}`}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-auto object-contain rounded-md"
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
