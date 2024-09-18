import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const STATUS_COLORS = {
    success: {
        background: "bg-green-100",
        text: "text-green-800",
        button: "bg-green-500 hover:bg-green-600",
    },
    error: {
        background: "bg-red-100",
        text: "text-red-800",
        button: "bg-red-500 hover:bg-red-600",
    },
};

const StatusModal = ({ open, onClose, status, title, description, formType }) => {
    const { background, text, button } = STATUS_COLORS[status] || STATUS_COLORS.success;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={`${background} ${text} p-4 rounded-lg`}>
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        {status === 'success' ? 'Success!' : 'Error'}
                    </DialogTitle>
                    <DialogDescription>
                        <p>{title}</p>
                        <p>{description}</p>
                        {status === 'success' && formType === 'interns_hiring' && (
                            <div className=" mt-4 text-orange-500">
                                <p>
                                    Thank you for expressing interest in joining our community as an intern. We’ll be in touch soon regarding the selection process. In the meantime, you can join our WhatsApp community to stay informed about the next steps and updates.
                                </p>
                                <div className="flex items-center mt-2 justify-center">
                                    <a
                                        href="https://chat.whatsapp.com/LS0zdE9jUf9CiPBZZ7W5p0" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        Join Our WhatsApp Community
                                    </a>
                                </div>
                            </div>

                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className={`${button} text-white px-4 py-2 rounded-lg focus:outline-none`}
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StatusModal;
