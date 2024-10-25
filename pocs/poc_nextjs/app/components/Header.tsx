import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-[74px] grid grid-cols-3 items-center">
          {/* Left section - Logo */}
          <div className="flex justify-start">
            <Link href="/" className="text-orange-500">
              <div className="w-8 h-8 bg-orange-500" />
            </Link>
          </div>

          {/* Center section - Navigation */}
          <div className="flex items-center justify-center space-x-8">
            <Link 
              href="/companies" 
              className="text-gray-600 hover:text-gray-900 whitespace-nowrap"
            >
              Companies & Recruiters
            </Link>
            <Link 
              href="/developers" 
              className="text-gray-600 hover:text-gray-900"
            >
              Developers
            </Link>
            <Link 
              href="/jobs" 
              className="text-gray-600 hover:text-gray-900"
            >
              Jobs
            </Link>
          </div>

          {/* Right section - User actions */}
          <div className="flex items-center justify-end space-x-6">
            <Link 
              href="/curriculum" 
              className="text-gray-600 hover:text-gray-900"
            >
              Curriculum
            </Link>
            <button 
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Search"
            >
              🔍
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Account"
            >
              👤
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}