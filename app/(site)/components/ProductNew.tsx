"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useRef, useEffect } from "react";
import { IProduct } from "../cautrucdata";
import WishlistButton from "./WishlistButton";
import AddToCart from "./AddToCart";




const mockProducts: IProduct[] = [
  { _id: '1', name: 'Đồng hồ demo 1', price: 1000000, sale_price: 900000, main_image: { image: 'breguet-classique-quantieme-perpetuel-7327bb-11-9vu-39mm.jpg.webp', alt: 'sp1' }, brand: { name: 'Brand A' }, quantity: 10, views: 100 },
  { _id: '2', name: 'Đồng hồ demo 2', price: 2000000, sale_price: 0, main_image: { image: 'bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp', alt: 'sp2' }, brand: { name: 'Brand B' }, quantity: 5, views: 50 },
  { _id: '3', name: 'Đồng hồ demo 3', price: 1500000, sale_price: 1200000, main_image: { image: 'bulova-murren-mechanical-hand-wind-automatic-watch-40mm1.jpg.webp', alt: 'sp3' }, brand: { name: 'Brand C' }, quantity: 8, views: 80 },
  { _id: '4', name: 'Đồng hồ demo 4', price: 2500000, sale_price: 0, main_image: { image: 'breguet-tradition-dame-7038bb-1t-9v6-d00d-watch-37mm.jpg_980_980.webp', alt: 'sp4' }, brand: { name: 'Brand D' }, quantity: 3, views: 30 },
  { _id: '5', name: 'Đồng hồ demo 5', price: 1800000, sale_price: 1500000, main_image: { image: 'bulova-accu-swiss-watch-31mm.jpg_980_980.webp', alt: 'sp5' }, brand: { name: 'Brand A' }, quantity: 7, views: 60 },
  { _id: '6', name: 'Đồng hồ demo 6', price: 3000000, sale_price: 2700000, main_image: { image: 'bulova-accutron-masella-chronograph-black-watch-40mm.jpg_980_980.webp', alt: 'sp6' }, brand: { name: 'Brand B' }, quantity: 2, views: 20 }
];

export default function ProductNew() {
    const [products] = useState<IProduct[]>(mockProducts);
    const [wishlistStatus] = useState<{[key: string]: boolean}>({});

    const containerRef = useRef<HTMLDivElement>(null);



    // Intersection Observer for staggered animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const items = entry.target.querySelectorAll('.product-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate-in');
                            }, index * 150);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full bg-gray-50 py-8" ref={containerRef}>
            <h3 className="text-center font-bold text-2xl mb-3 animate-section">
                SẢN PHẨM MỚI NHẤT
            </h3>
            <div className="mx-auto mb-8 w-30 h-1 bg-red-700 rounded animate-section"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={2}
                    navigation
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    breakpoints={{
                        768: { slidesPerView: 4 },
                        480: { slidesPerView: 3 },
                    }}
                    loop
                >
                    {products.map((sp, idx) => (
                        <SwiperSlide key={sp._id || idx}>
                            <div className="product-item animate-stagger relative flex flex-col bg-white rounded shadow hover:shadow-lg transition-all duration-500 p-4 group h-full hover-lift">
                                <Link href={`/product/${sp._id}`} className="flex-shrink-0 flex items-center justify-center h-48 mb-3 overflow-hidden">
                                    <img
                                        src={`/upload/product/${sp.main_image?.image}`}
                                        alt={sp.name}
                                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-all duration-500"
                                    />
                                </Link>

                                <div className="flex flex-col flex-grow min-h-[60px]">
                                    <div className="flex justify-between items-start mb-1">
                                        <h6 className="font-semibold text-base text-gray-800 flex-grow mr-2 line-clamp-2 transition-colors duration-300 group-hover:text-red-600">
                                            {sp.name}
                                        </h6>
                                        <div className="flex-shrink-0 text-gray-500 text-[12px] flex items-center">
                                            <i className="fa-solid fa-star text-orange-400 mr-1"></i>4.0
                                        </div>
                                    </div>
                                    <p className="text-[12px] text-gray-600 mb-2 truncate transition-colors duration-300">
                                        {sp.brand.name ?? "Không rõ thương hiệu"}
                                    </p>
                                </div>

                                <div className="mt-auto flex flex-col">
                                    {sp.sale_price > 0 && (
                                        <>
                                            <span className="text-[14px] font-bold text-gray-500 absolute top-2 left-2 bg-red-600 text-white px-1 py-2 rounded-sm z-10 animate-bounce-in">
                                                {Math.round(((sp.price - sp.sale_price) / sp.price) * 100)}%
                                            </span>
                                            <div className="flex flex-wrap items-center gap-1">
                                                <span className="text-gray-600 font-normal line-through text-sm transition-colors duration-300">
                                                    {sp.price.toLocaleString("vi-VN")}đ
                                                </span>
                                                <span className="text-red-600 font-bold text-[16px] transition-colors duration-300">
                                                    {sp.sale_price.toLocaleString("vi-VN")}đ
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {sp.sale_price === 0 && (
                                        <div>
                                            <span className="text-gray-900 font-bold text-[16px] transition-colors duration-300">
                                                {sp.price.toLocaleString("vi-VN")}đ
                                            </span>
                                        </div>
                                    )}
                                    <div className="mt-2">
                                        <AddToCart sp={sp} />
                                    </div>
                                </div>

                                <div className="absolute top-2 right-2 z-10">
                                    <WishlistButton 
                                        productId={sp._id} 
                                        initialIsWishlisted={wishlistStatus[sp._id] || false}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <style jsx global>{`
                .swiper-button-next,
                .swiper-button-prev {
                    color: #6b7280 !important;
                }
                .swiper-button-next {
                    right: -32px;
                }
                .swiper-button-prev {
                    left: -32px;
                }
                .swiper-button-prev,
                .swiper-button-next {
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 10;
                }
                @media (max-width: 767px) {
                    .swiper-button-next,
                    .swiper-button-prev {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}