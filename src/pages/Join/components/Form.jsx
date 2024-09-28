import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import department from "@/const/departmentList";
import { createRecord } from "@/utils/airtableService";
import StatusModal from "@/components/common/Modal";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const formSchema = z.object({
    Name: z.string().min(1, 'Name is required'),
    Phone_number: z.string().length(10, 'Phone number must be 10 digits'),
    department: z.string().min(1, 'Department is required'),
    year: z.string().nonempty('Please select your year'),
    email: z.string().email('Invalid email format'),
    Admission_No: z.string().min(1, 'Admission number is required'),
    preferred_role: z.string().min(1, 'Preferred role is required'),
    custom_role: z.string().optional(),
    hobby: z.string().min(1, 'Hobby is required'),
    how_did_you_hear: z.string().min(1, 'Please let us know how you heard about Connect'),
    expectations: z.string().min(1, 'Expectations are required'),
    reason: z.string().min(1, 'Reason for joining is required'),
    interesting_fact: z.string().min(1, 'Tell us something interesting about yourself'),
    other_communities: z.string().nonempty('Please select a community'),
}).refine((data) => {
    // If preferred_role is "Other", then custom_role should not be empty
    if (data.preferred_role === 'Other') {
        return data.custom_role && data.custom_role.trim().length > 0;
    }
    return true;
}, {
    message: 'Please specify your preferred role',
    path: ['custom_role'],
});

const communities = [
    "IEDC",
    "NSS",
    "NCC",
    "Union",
    "Other",
];

export function JoinForm() {
    const [modalStatus, setModalStatus] = useState(null); // 'success' | 'error' | null
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOtherRole, setIsOtherRole] = useState(false);
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Name: "",
            Admission_No: "",
            department: "",
            year: "",
            Phone_number: "",
            email: "",
            how_did_you_hear: "",
            preferred_role: "",
            custom_role: "",
            hobby: "",
            expectations: "",
            reason: "",
            interesting_fact: "",
            other_communities: "",
        },
    });

    async function onSubmit(values) {
        try {
            setLoading(true);
            // console.log(values);
            await createRecord("interns_selection_2025", values, 1);
            setModalStatus('success');
        } catch (error) {
            console.error("Error submitting form:", error);
            setModalStatus('error');
        } finally {
            setSearchQuery('');
            setLoading(false);
            form.reset();
            setModalOpen(true);
        }
    }




    // Filter departments based on search query
    const filteredDepartments = department.filter(dept =>
        dept.value.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Form {...form} className="min-w-full">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <div className="space-y-4 md:space-y-0 md:gap-x-8 md:gap-y-4 grid md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="Name"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your sweet name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Admission_No"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Your Admission No</FormLabel>
                                    <FormControl>
                                        <Input placeholder="23BSCA110" className="uppercase" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Your Department</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        {/* Search Input */}
                                                        <input
                                                            type="search"
                                                            placeholder="Search departments"
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            className="w-[90%] mx-auto py-2 outline-none" // Add your styling here
                                                            clear={'true'}
                                                        />
                                                    </SelectLabel>

                                                    {/* Filtered Department Options */}
                                                    {filteredDepartments.map((dept, index) => (
                                                        <SelectItem key={index} value={dept.value}>
                                                            {dept.value}
                                                        </SelectItem>
                                                    ))}
                                                    {filteredDepartments.length === 0 && (
                                                        <SelectItem disabled key={111}>
                                                            No departments found
                                                        </SelectItem>
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Your email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <FormField
                        control={form.control}
                        name="how_did_you_hear"
                        render={({ field }) => (
                            <FormItem ref={parent}>
                                <FormLabel>How did you hear about Connect?</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="How did you hear about Connect?" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-4 md:space-y-0 md:gap-x-8 md:gap-y-4 grid md:grid-cols-2" ref={parent}>
                        <FormField
                            control={form.control}
                            name="Phone_number"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your whatsapp number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Your Year</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Year</SelectLabel>
                                                    <SelectItem value="First">First</SelectItem>
                                                    <SelectItem value="Second">Second</SelectItem>
                                                    <SelectItem value="Third">Third</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="preferred_role"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Preferred role in Connect</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setIsOtherRole(value === "Other");
                                            }}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Roles</SelectLabel>
                                                    <SelectItem value="Graphic designer">Graphic designer</SelectItem>
                                                    <SelectItem value="Tech intern">Tech intern</SelectItem>
                                                    <SelectItem value="Community manager">Community manager</SelectItem>
                                                    <SelectItem value="Video editor/photographer">Video editor/photographer</SelectItem>
                                                    <SelectItem value="Content writer">Content writer</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {isOtherRole && (
                            <>
                                <div className="hidden md:block w-full h-[1px]">
                                </div>
                                <FormField
                                    control={form.control}
                                    name="custom_role"
                                    render={({ field }) => (
                                        <FormItem ref={parent}>
                                            <FormLabel>Please specify your preferred role</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Tell us what role you're interested in" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                    </div>
                    <FormField
                        control={form.control}
                        name="interesting_fact"
                        render={({ field }) => (
                            <FormItem ref={parent}>
                                <FormLabel>Tell us something interesting about yourself</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Interesting fact" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-2 md:space-y-0 md:gap-x-8 md:gap-y-4 grid md:grid-cols-2">

                        <FormField
                            control={form.control}
                            name="expectations"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>What are your expectations from Connect?</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Your expectations" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Why do you want to be a part of this community?</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Your reason" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="space-y-8 md:space-y-0 md:gap-8 grid md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="hobby"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>What is your hobby?</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Your hobby" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="other_communities"
                            render={({ field }) => (
                                <FormItem ref={parent}>
                                    <FormLabel>Are you part of any other community, club, or organization?</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a community or club" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Clubs</SelectLabel>
                                                    {communities.map((club) => (
                                                        <SelectItem key={club} value={club}>
                                                            {club}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full flex justify-end">
                        <Button type="submit" disabled={loading} className="px-14 font-semibold ">
                            {loading ? <Loader className="animate-spin" /> : "Register"}
                        </Button>
                    </div>
                </form>
            </Form>
            <StatusModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                status={modalStatus}
                title={modalStatus === 'success' ? 'Registration Successful' : 'Registration Error'}
                description={modalStatus === 'success'
                    ? 'Thank you for your interest in registering our community as an intern! We’ll review your application and contact you soon. Join our Hiring WhatsApp group for updates!'
                    : 'Error submitting your registration. Please try again. If the problem persists, contact us at 8113860921.'}
                formType="interns_hiring"
            />

        </>
    );
}
