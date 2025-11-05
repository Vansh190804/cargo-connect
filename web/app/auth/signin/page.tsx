"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthForm } from "@/web/components/auth/auth-form"
import { SocialButtons } from "@/web/components/auth/social-buttons"
import { ArrowLeft, Truck, ShoppingCart } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"user" | "vendor" | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      console.log("Sign in with:", { email, password, userType })
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (userType === "vendor") {
        router.push("/vendor/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  if (!userType) {
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
            <h1 className="text-3xl font-bold text-white mt-6 mb-2">Welcome</h1>
            <p className="text-white/70">Choose your role to continue</p>
          </div>

          {/* User Type Selection */}
          <div className="space-y-4">
            <button
              onClick={() => setUserType("user")}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-white mb-2">I Need a Truck</h2>
              <p className="text-white/70 text-sm">Book and track your shipments</p>
            </button>

            <button
              onClick={() => setUserType("vendor")}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Truck className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-white mb-2">I'm a Driver</h2>
              <p className="text-white/70 text-sm">Offer services and earn money</p>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-white/70 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-accent hover:text-accent/80 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setUserType(null)}
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">CC</span>
            </div>
            <span className="text-white font-bold text-xl">Cargo Connect</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-6 mb-2">Welcome Back</h1>
          <p className="text-white/70">{userType === "vendor" ? "Sign in as a driver" : "Sign in to your account"}</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 mb-6">
          <AuthForm type="signin" onSubmit={handleSignIn} />
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

        {/* Sign Up Link */}
        <p className="text-center text-white/70">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-accent hover:text-accent/80 font-semibold transition-colors">
            Sign up
          </Link>
        </p>

        {/* Additional Links */}
        <div className="mt-8 pt-8 border-t border-white/10 flex justify-between">
          <Link href="/auth/forgot" className="text-sm text-white/70 hover:text-accent transition-colors">
            Forgot password?
          </Link>
          <Link href="#" className="text-sm text-white/70 hover:text-accent transition-colors">
            Need help?
          </Link>
        </div>
      </div>
    </div>
  )
}
