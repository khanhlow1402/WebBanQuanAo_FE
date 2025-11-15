import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Heart, ShoppingCart, Eye } from "lucide-react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data.result || []);
          setFilteredProducts(data.result || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data.result || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
  const categoryId = parseInt(selectedCategory);
  filtered = filtered.filter(
    (product) => product.category?.id === categoryId
  );
}

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-200">
            Discover the latest fashion trends from KH3T Studio
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 w-full md:w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Filter Toggle */}
            <button
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full md:w-auto justify-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Price Range Filter */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: {formatPrice(priceRange[0])} -{" "}
                {formatPrice(priceRange[1])}
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden h-80">
                  <img
                    src={product.imageUrlFront}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  
                  {/* Discount Badge */}
                  {product.discountAmount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{product.discountAmount}%
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                    <button className="bg-white p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition">
                      <Heart size={20} />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition">
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 h-14">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.rating})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-red-500">
                        {formatPrice(product.price)}
                      </p>
                      {product.discountAmount > 0 && (
                        <p className="text-sm text-gray-400 line-through">
                          {formatPrice(
                            product.price * (1 + product.discountAmount / 100)
                          )}
                        </p>
                      )}
                    </div>
                    <button className="bg-black text-white p-3 rounded-full hover:bg-red-500 transition">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;