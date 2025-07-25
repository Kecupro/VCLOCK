"use client";
import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AddToCart from '../components/AddToCart';
import WishlistButton from '../components/WishlistButton';
import { IProduct } from '../cautrucdata';
import { IBrand } from '../cautrucdata';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  type SearchProduct = IProduct & { brand_id?: string };
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    priceRange: '',
    sortBy: 'relevance'
  });
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<SearchProduct[]>([]);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, filters]);

  useEffect(() => {
    // Mock data for brands
    setBrands([
      { _id: 'b1', name: 'Brand A', productCount: 2, image: 'luxury-shoping1-1.png.webp' },
      { _id: 'b2', name: 'Brand B', productCount: 1, image: 'luxshopping77-1.png.webp' },
      { _id: 'b3', name: 'Brand C', productCount: 1, image: 'vesus-luxury-shopping1-1.png.webp' },
      { _id: 'b4', name: 'Brand D', productCount: 1, image: 'luxshoppingvn2-1.png.webp' }
    ]);
  }, []);

  const brandMap = useMemo(() => Object.fromEntries(brands.map(b => [b._id, b.name])), [brands]);

  const performSearch = async () => {
    setLoading(true);
    try {
      // Mock search response
      const mockResponse = {
        products: [
          { _id: '1', name: 'Đồng hồ demo 1', price: 1000000, sale_price: 900000, main_image: { image: 'breguet-classique-quantieme-perpetuel-7327bb-11-9vu-39mm.jpg.webp', alt: 'sp1' }, brand: { name: 'Brand A' }, quantity: 10, views: 100 },
          { _id: '2', name: 'Đồng hồ demo 2', price: 2000000, sale_price: 0, main_image: { image: 'bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp', alt: 'sp2' }, brand: { name: 'Brand B' }, quantity: 5, views: 50 },
          { _id: '3', name: 'Đồng hồ demo 3', price: 1500000, sale_price: 1200000, main_image: { image: 'bulova-murren-mechanical-hand-wind-automatic-watch-40mm1.jpg.webp', alt: 'sp3' }, brand: { name: 'Brand C' }, quantity: 8, views: 80 },
          { _id: '4', name: 'Đồng hồ demo 4', price: 2500000, sale_price: 0, main_image: { image: 'breguet-tradition-dame-7038bb-1t-9v6-d00d-watch-37mm.jpg_980_980.webp', alt: 'sp4' }, brand: { name: 'Brand D' }, quantity: 3, views: 30 }
        ]
      };
      console.log('API search response:', mockResponse);
      setProducts(mockResponse.products || []);
    } catch (error) {
      console.error('Search error:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sản phẩm nổi bật khi không có kết quả
  useEffect(() => {
    if (!loading && products.length === 0) {
      // Mock top-rated products
      setSuggestedProducts([
        { _id: '1', name: 'Đồng hồ nổi bật 1', price: 1000000, sale_price: 900000, main_image: { image: 'bulova-accu-swiss-a-15-mechanical-watch-40mm1.jpg_980_980.webp', alt: 'sp1' }, brand: { name: 'Brand A' }, quantity: 10, views: 100 },
        { _id: '2', name: 'Đồng hồ nổi bật 2', price: 2000000, sale_price: 0, main_image: { image: 'bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp', alt: 'sp2' }, brand: { name: 'Brand B' }, quantity: 5, views: 50 },
        { _id: '3', name: 'Đồng hồ nổi bật 3', price: 1500000, sale_price: 1200000, main_image: { image: 'bulova-murren-mechanical-hand-wind-automatic-watch-40mm1.jpg.webp', alt: 'sp3' }, brand: { name: 'Brand C' }, quantity: 8, views: 80 },
        { _id: '4', name: 'Đồng hồ nổi bật 4', price: 2500000, sale_price: 0, main_image: { image: 'breguet-tradition-dame-7038bb-1t-9v6-d00d-watch-37mm.jpg_980_980.webp', alt: 'sp4' }, brand: { name: 'Brand D' }, quantity: 3, views: 30 }
      ]);
    } else {
      setSuggestedProducts([]);
    }
  }, [loading, products]);

  // // Helper function để lấy image URL an toàn
  // const getProductImage = (product: Product) => {
  //   if (!product.images || product.images.length === 0) return '/sp1.png';
    
  //   return `/upload/product/${product.images[0]}`;
  // };

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tìm kiếm</h1>
          <p className="text-gray-600">Vui lòng nhập từ khóa tìm kiếm</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Kết quả tìm kiếm cho &ldquo;{query}&rdquo;
          </h1>
          <p className="text-gray-600">
            Tìm thấy {products.length} sản phẩm
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow p-4 h-fit">
            <h3 className="font-semibold text-gray-900 mb-4">Bộ lọc</h3>
            
            {/* Brand Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thương hiệu
              </label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({...filters, brand: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Tất cả</option>
                <option value="breguet">Breguet</option>
                <option value="cartier">Cartier</option>
                <option value="rolex">Rolex</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Tất cả</option>
                <option value="dong-ho-nam">Đồng hồ nam</option>
                <option value="dong-ho-nu">Đồng hồ nữ</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Khoảng giá
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Tất cả</option>
                <option value="0-10000000">Dưới 10 triệu</option>
                <option value="10000000-50000000">10 - 50 triệu</option>
                <option value="50000000-100000000">50 - 100 triệu</option>
                <option value="100000000+">Trên 100 triệu</option>
              </select>
            </div>

            {/* Sort */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sắp xếp
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="relevance">Liên quan nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="name-asc">Tên A-Z</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
            ) : products.length > 0 ? (
              <div className={`w-full flex justify-center`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                  {products.map((product) => {
                    // Tính phần trăm giảm giá giống Show1SP
                    const percent = product.price && product.sale_price && product.sale_price > 0
                      ? Math.round(((product.price - product.sale_price) / product.price) * 100)
                      : 0;
                    return (
                      <div
                        key={product._id}
                        className="relative flex flex-col bg-white rounded shadow hover:shadow-lg transition p-4 group h-full min-h-[390px] min-w-[220px] max-w-[340px] w-full mx-auto"
                      >
                        <Link href={`/product/${product._id}`} className="flex-shrink-0 flex items-center justify-center h-48 mb-3 overflow-hidden">
                          <img
                            src={
                              product.main_image?.image
                                ? `/upload/product/${product.main_image.image}`
                                : product.images && product.images.length > 0
                                  ? `/upload/product/${product.images[0].image || product.images[0]}`
                                  : '/sp1.png'
                            }
                            alt={product.name}
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition duration-300"
                          />
                        </Link>
                        <div className="flex flex-col flex-grow min-h-[60px]">
                          <div className="flex justify-between items-start mb-1">
                            <h6 className="font-semibold text-base text-gray-800 flex-grow mr-2 line-clamp-2">
                              {product.name}
                            </h6>
                            <div className="flex-shrink-0 text-gray-500 text-[12px] flex items-center">
                              <i className="fa-solid fa-star text-orange-400 mr-1"></i>4.0
                            </div>
                          </div>
                          <p className="text-[12px] text-gray-600 mb-2 truncate">
                            {product.brand?.name ?? brandMap[product.brand_id || ''] ?? "Không rõ thương hiệu"}
                          </p>
                        </div>
                        <div className="mt-auto flex flex-col">
                          {product.sale_price && product.sale_price > 0 ? (
                            <>
                              <span className="text-[14px] font-bold text-gray-500 absolute top-2 left-2 bg-red-600 text-white px-1 py-2 rounded-sm z-10">
                                {percent}%
                              </span>
                              <div className="flex flex-wrap items-center gap-1">
                                <span className="text-gray-600 font-normal line-through text-sm">
                                  {product.price?.toLocaleString('vi-VN')}đ
                                </span>
                                <span className="text-red-600 font-bold text-[16px]">
                                  {product.sale_price?.toLocaleString('vi-VN')}đ
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>
                              <span className="text-gray-900 font-bold text-[16px]">
                                {product.price?.toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                          )}
                          <div className="mt-2">
                            <AddToCart sp={product} />
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 z-10">
                          <WishlistButton productId={product._id} initialIsWishlisted={false} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <i className="fa-solid fa-search text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-600 mb-6">
                  Thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả
                </p>
                {suggestedProducts.length > 0 && (
                  <>
                    <h4 className="text-base font-semibold text-gray-800 mb-4">Có thể bạn quan tâm</h4>
                    <div className={`w-full flex justify-center`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        {suggestedProducts.map((product) => {
                          const percent = product.price && product.sale_price && product.sale_price > 0
                            ? Math.round(((product.price - product.sale_price) / product.price) * 100)
                            : 0;
                          return (
                            <div
                              key={product._id}
                              className="relative flex flex-col bg-white rounded shadow hover:shadow-lg transition p-4 group h-full min-h-[390px] min-w-[220px] max-w-[340px] w-full mx-auto"
                            >
                              <Link href={`/product/${product._id}`} className="flex-shrink-0 flex items-center justify-center h-48 mb-3 overflow-hidden">
                                <img
                                  src={
                                    product.main_image?.image
                                      ? `/upload/product/${product.main_image.image}`
                                      : product.images && product.images.length > 0
                                        ? `/upload/product/${product.images[0].image || product.images[0]}`
                                        : '/sp1.png'
                                  }
                                  alt={product.name}
                                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition duration-300"
                                />
                              </Link>
                              <div className="flex flex-col flex-grow min-h-[60px]">
                                <div className="flex justify-between items-start mb-1">
                                  <h6 className="font-semibold text-base text-gray-800 flex-grow mr-2 line-clamp-2">
                                    {product.name}
                                  </h6>
                                  <div className="flex-shrink-0 text-gray-500 text-[12px] flex items-center">
                                    <i className="fa-solid fa-star text-orange-400 mr-1"></i>4.0
                                  </div>
                                </div>
                                <p className="text-[12px] text-gray-600 mb-2 truncate">
                                  {product.brand?.name ?? brandMap[product.brand_id || ''] ?? "Không rõ thương hiệu"}
                                </p>
                              </div>
                              <div className="mt-auto flex flex-col">
                                {product.sale_price && product.sale_price > 0 ? (
                                  <>
                                    <span className="text-[14px] font-bold text-gray-500 absolute top-2 left-2 bg-red-600 text-white px-1 py-2 rounded-sm z-10">
                                      {percent}%
                                    </span>
                                    <div className="flex flex-wrap items-center gap-1">
                                      <span className="text-gray-600 font-normal line-through text-sm">
                                        {product.price?.toLocaleString('vi-VN')}đ
                                      </span>
                                      <span className="text-red-600 font-bold text-[16px]">
                                        {product.sale_price?.toLocaleString('vi-VN')}đ
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <div>
                                    <span className="text-gray-900 font-bold text-[16px]">
                                      {product.price?.toLocaleString('vi-VN')}đ
                                    </span>
                                  </div>
                                )}
                                <div className="mt-2">
                                  <AddToCart sp={product} />
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 z-10">
                                <WishlistButton productId={product._id} initialIsWishlisted={false} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}