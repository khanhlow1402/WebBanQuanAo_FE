import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight">
              KH<span className="text-red-500">3</span>T STUDIO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            <Link to="/" className="text-black font-bold text-lg hover:text-red-500 transition">
              Home
            </Link>
            <Link to="/product" className="text-gray-700 font-bold text-lg hover:text-red-500 transition">
              Product
            </Link>
            <Link to="/about" className="text-gray-700 font-bold text-lg hover:text-red-500 transition">
              About Us
            </Link>
            <Link to="/policy" className="text-gray-700 font-bold text-lg hover:text-red-500 transition">
              Policy
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-6 sm:gap-8">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              {searchOpen ? (
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="border border-gray-300 rounded-full px-5 py-2.5 w-48 lg:w-64 focus:outline-none focus:border-red-500 text-base"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              ) : (
                <button onClick={() => setSearchOpen(true)} className="text-gray-600 hover:text-red-500 transition">
                  <Search size={26} strokeWidth={2} />
                </button>
              )}
            </div>

            {/* User Icon */}
            <Link to="/login" className="text-gray-600 hover:text-red-500 transition">
              <User size={26} strokeWidth={2} />
            </Link>

            {/* Cart Icon */}
            <button className="text-gray-600 hover:text-red-500 transition relative">
              <ShoppingCart size={26} strokeWidth={2} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-gray-600 hover:text-red-500 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-gray-800 font-bold text-base hover:text-red-500 transition py-2">
                Home
              </Link>
              <Link to="/product" className="text-gray-700 font-bold text-base hover:text-red-500 transition py-2">
                Product
              </Link>
              <Link to="/about" className="text-gray-700 font-bold text-base hover:text-red-500 transition py-2">
                About Us
              </Link>
              <Link to="/policy" className="text-gray-700 font-bold text-base hover:text-red-500 transition py-2">
                Policy
              </Link>
              {/* Mobile Search */}
              <div className="sm:hidden pt-2">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full border border-gray-300 rounded-full px-4 py-2.5 focus:outline-none focus:border-red-500 text-base"
                />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}