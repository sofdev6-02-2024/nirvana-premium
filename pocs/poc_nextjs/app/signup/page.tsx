import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {
  return (
    <main className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg border border-gray-200 p-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left side - Logo and Slogan */}
          <div className="flex flex-col">
            <div className="relative bg-[#FF6B00] rounded-lg aspect-square w-full max-w-md">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/2 h-1/2 bg-white rounded-full" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-[#FF6B00] text-2xl font-medium">/tp Chamba</h2>
              <p className="text-gray-500 text-sm mt-1">Fun Fact: The slogan text may change.</p>
            </div>
          </div>

          {/* Right side - Sign Up Form */}
          <div className="flex flex-col">
            <div className="max-w-md w-full">
              <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
              
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">You already have an account?</p>
                <Link href="/login" className="text-sm text-[#FF6B00]">
                  Login
                </Link>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex items-center justify-center space-x-4 mt-6">
                  <button
                    type="button"
                    className="p-2 border border-gray-300 rounded-md"
                    aria-label="Sign up with GitHub"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 border border-gray-300 rounded-md"
                    aria-label="Sign up with Google"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                    </svg>
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF6B00] text-white py-2 rounded-md mt-4 hover:bg-[#E66000] transition-colors"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}