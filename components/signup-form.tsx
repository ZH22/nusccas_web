"use client"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { Control, FieldPath, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { LoadingButton } from "./ui/loading-button";
import { AuthApiError, isAuthApiError } from "@supabase/supabase-js";
import { useState, useEffect } from "react"
import { Toaster, toast } from 'sonner'

// Zod Schema for Form Validation (Matches via 'name' property)
const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, { //Checks if confirm Password field equal
  message: "Passwords Not Equal",
  path: ['confirmPassword'],
});

// TSX Component
interface SignupFormProps extends React.ComponentProps<"div"> {
  onSignup: (formData: FormData) => Promise<AuthApiError>;
}


export function SignupForm({
  className,
  onSignup,
  ...props
}: SignupFormProps) {

  // Use React-Form Hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  // Loading State
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AuthApiError | undefined>(undefined)

  // For Toast Error showing
  useEffect(() => {
    if (isAuthApiError(data)) {
      if (data?.message){
        toast.info(data?.message)
      }
    }

  }, [data])
  

  // Convert to formData object to allow for signup action to work
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    // Prevent repeated submissions
    if (loading) return;

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setLoading(true);
    const result = await onSignup(formData)
    setData(result)
  }


  // form object from react-hook-form -> handles the submission (Checks for validity via zod before submission) 
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create a new account with us!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={ form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4">
              
              <SignupFormField 
                name="email"
                label="Email"
                placeholder="example@yourmail.com"
                inputType="email"
                formControl={form.control}
              />

              <SignupFormField 
                name="password"
                label="Password"
                placeholder="password"
                inputType="password"
                formControl={form.control}

              />

              <SignupFormField 
                name="confirmPassword"
                label="Confirm Password"
                placeholder="confirm password"
                inputType="password"
                formControl={form.control}

              />

              <LoadingButton type='submit' variant="outline" loading={loading} disabled={loading} className="hover:cursor-pointer">Sign Up</LoadingButton>
            </form>
          </Form>
          <p className="mt-2">Already have an account? <Link href="/login">Login</Link></p>
        </CardContent>
      </Card>
      
      <Toaster richColors expand={true} position="top-center"/>
    </div>
  )
};


// Custom Fields (ShadCN Wrapper) -> Allows for Zod Checking ====================================
interface SignupFormFieldProps {
  // Explicity limiting the name properties to what is defined in formSchema
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof formSchema>>;
}

const SignupFormField: React.FC<SignupFormFieldProps> = ({
  name, label, placeholder, description, inputType, formControl
}) => {
  return(
    <FormField 
      control={formControl}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={inputType || 'text'} {...field}/>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
};
// ============================================================================================