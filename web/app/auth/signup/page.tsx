"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthForm } from "@/web/components/auth/auth-form"
import { SocialButtons } from "@/web/components/auth/social-buttons"
import { ArrowLeft } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSignUp = async (email: string, password: string) => {
    if (!agreedToTerms) {
      throw new Error("Please agree to the terms and conditions")
    }

    try {
      // TODO: Implement actual registration
      console.log("Sign up with:", { email, password })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to verification or dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">CC</span>
            </div>
            <span className="text-white font-bold text-xl">Cargo Connect</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-6 mb-2">Create Account</h1>
          <p className="text-white/70">Join thousands moving goods reliably</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 mb-6">
          <AuthForm type="signup" onSubmit={handleSignUp} />

          {/* Terms Checkbox */}
          <div className="mt-6 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 accent-accent rounded border-border"
              />
              <span className="text-sm text-white/70">
                I agree to the{" "}
                <Link href="#" className="text-accent hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-sm text-white/70">Or continue with</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social Buttons */}
        <div className="mb-8">
          <SocialButtons />
        </div>

        {/* Sign In Link */}
        <p className="text-center text-white/70">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-accent hover:text-accent/80 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
