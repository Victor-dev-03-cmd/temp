import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export const metadata = {
  title: "Register - Temple Platform",
  description: "Create your Temple Platform account",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">T</span>
            </div>
            <span className="font-bold text-2xl">Temple Platform</span>
          </Link>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Join thousands of devotees worldwide</p>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
