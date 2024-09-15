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

const formSchema = z.object({
    name: z.string().nonempty("Name is required"),
    phone_number: z.string().nonempty("Phone number is required"),
    department: z.string().nonempty("Department is required"),
    hobby: z.string().nonempty("Hobby is required"),
    talent: z.string().nonempty("Talent is required"),
    how_did_you_hear: z.string().nonempty("How did you hear about Connect is required"),
    expectations: z.string().nonempty("Expectations from Connect is required"),
    preferred_role: z.enum([
        "Graphic designer",
        "Tech intern",
        "Community manager",
        "Video editor/photographer",
        "Content writer",
        "Other",
    ]),
    reason: z.string().nonempty("Why do you want to be a part of this community is required"),
    other_communities: z.string().nonempty("Are you part of any other community, club, or organization?"),
    interesting_fact: z.string().nonempty("Tell us something interesting about yourself is required"),
});

const communities = [
    "IEDC",
    "NSS",
    "NCC",
    "SIP",
    "Union",
    "Other",
];

export function JoinForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone_number: "",
            department: "",
            hobby: "",
            talent: "",
            how_did_you_hear: "",
            expectations: "",
            preferred_role: "",
            reason: "",
            other_communities: "",
            interesting_fact: "",
        },
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Form {...form} className="min-w-full">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <div className="space-y-8 md:space-y-0 md:gap-8 grid md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input placeholder="123-456-7890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
            <div className="space-y-8 md:space-y-0 md:gap-8 grid md:grid-cols-2">
                    
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Department</FormLabel>
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
                                                <SelectLabel>Departments</SelectLabel>
                                                {department.map((dept, index) => (
                                                    <SelectItem key={index} value={dept.value}>
                                                        {dept.value}
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
                <FormField
                    control={form.control}
                    name="hobby"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What is your hobby?</FormLabel>
                            <FormControl>
                                <Input placeholder="Your hobby" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <div className="space-y-8 md:space-y-0 md:gap-8 grid md:grid-cols-2">

                <FormField
                    control={form.control}
                    name="talent"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What is your talent?</FormLabel>
                            <FormControl>
                                <Input placeholder="Your talent" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="how_did_you_hear"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>How did you hear about Connect?</FormLabel>
                            <FormControl>
                                <Textarea placeholder="How did you hear about Connect?" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <div className="space-y-8 md:space-y-0 md:gap-8 grid md:grid-cols-2">

                <FormField
                    control={form.control}
                    name="expectations"
                    render={({ field }) => (
                        <FormItem>
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
                    name="preferred_role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preferred role in Connect</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
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
                </div>
                <div className="space-y-8 md:space-y-0 md:gap-8 grid md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Why do you want to be a part of this community?</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Your reason" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="other_communities"
                    render={({ field }) => (
                        <FormItem>
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
                <FormField
                    control={form.control}
                    name="interesting_fact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tell us something interesting about yourself</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Interesting fact" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end">
                    <Button type="submit" className="px-10 font-semibold">Join</Button>
                </div>
            </form>
        </Form>
    );
}
