"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IAddress } from "../cautrucdata";

interface TabItem {
  key: "info" | "addresses" | "favorites" | "voucher";
  label: string;
  icon: string;
}

const tabItems: TabItem[] = [
  { key: "info", label: "Tài khoản", icon: "fa-solid fa-user" },
  { key: "favorites", label: "Sản phẩm yêu thích", icon: "fa-solid fa-heart" },
  { key: "addresses", label: "Địa chỉ của tôi", icon: "fa-solid fa-location-dot" },
  { key: "voucher", label: "Voucher", icon: "fa-solid fa-ticket" },
];

export default function AccountPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"info" | "addresses" | "favorites" | "voucher">("info");

  const handleDisabledFeature = () => {
    alert("Tính năng này đã bị vô hiệu hóa trong chế độ demo.");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Đang chuyển hướng...</p>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-4 pt-40 font-sans bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-gray-50 p-6 ">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-24 h-24 mb-4 group">
                <img
                  src={user.avatar || '/avatar-default.png'}
                  alt={user.fullname || 'User Avatar'}
                  className="w-24 h-24 rounded-full object-cover border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/avatar-default.png';
                  }}
                />
                <button
                  type="button"
                  onClick={handleDisabledFeature}
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 border border-gray-200 hover:bg-gray-50 transition-all duration-300 cursor-not-allowed"
                >
                  <i className="fa-solid fa-camera text-gray-600"></i>
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{user.fullname}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <nav className="space-y-2">
              {tabItems.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    tab === key
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <i className={`${icon} w-5 h-5`}></i>
                  <span className="font-medium">{label}</span>
                </button>
              ))}
              <button
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200 cursor-not-allowed"
                onClick={handleDisabledFeature}
              >
                <i className="fa-solid fa-right-from-bracket w-5 h-5"></i>
                <span className="font-medium">Đăng xuất</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <section className="flex-1 p-8 bg-white">
            {tab === "info" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Thông tin tài khoản</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Họ và tên</label>
                    <input type="text" readOnly value={user.fullname || ''} className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <input type="email" readOnly value={user.email || ''} className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm cursor-not-allowed" />
                  </div>
                  <button onClick={handleDisabledFeature} className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 cursor-not-allowed">Cập nhật</button>
                </div>
              </div>
            )}

            {tab === "addresses" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Địa chỉ của tôi</h2>
                <div className="space-y-4">
                  {user.addresses && user.addresses.map((addr: IAddress) => (
                    <div key={addr._id} className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{addr.receiver_name}</p>
                        <p>{addr.phone}</p>
                        <p>{addr.address}</p>
                      </div>
                      <div className="space-x-2">
                        <button onClick={handleDisabledFeature} className="text-gray-400 cursor-not-allowed"><i className="fa-solid fa-pen"></i></button>
                        <button onClick={handleDisabledFeature} className="text-gray-400 cursor-not-allowed"><i className="fa-solid fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handleDisabledFeature} className="mt-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 cursor-not-allowed">Thêm địa chỉ mới</button>
              </div>
            )}

            {tab === "favorites" && (
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Sản phẩm yêu thích</h2>
                    <p className="text-gray-500">Không có sản phẩm yêu thích nào trong chế độ demo.</p>
                </div>
            )}

            {tab === "voucher" && (
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Voucher</h2>
                    <p className="text-gray-500">Không có voucher nào trong chế độ demo.</p>
                </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
                    onClick={handleAvatarSave}
                    disabled={isLoading}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span>{isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                  </button>
                )}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={currentEmail}
                        readOnly
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed focus:ring-0 focus:border-gray-300 transition-all duration-200"
                      />
                    </div>
                  </div>
                </form>
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Đơn hàng của tôi</h2>
                  <OrderCard user_id={user?._id || ""} />
                </div>
              </div>
            )}

            {tab === "addresses" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Địa chỉ </h2>
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center space-x-2"
                  >
                    <i className="fa-solid fa-plus"></i>
                    <span>Thêm địa chỉ mới</span>
                  </button>
                </div>

                {isAddingAddress && (
                  <form onSubmit={handleAddAddress} className="mb-8 p-6 bg-white rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Thêm địa chỉ mới</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Tên người nhận</label>
                        <input
                          type="text"
                          value={newAddress.receiver_name}
                          onChange={(e) => setNewAddress({...newAddress, receiver_name: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          placeholder="Ví dụ: Nguyễn Văn A"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Số điện thoại</label>
                        <input
                          type="tel"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          placeholder="Ví dụ: 0123456789"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Địa chỉ</label>
                        <input
                          type="text"
                          value={newAddress.address}
                          onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          placeholder="Ví dụ: 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingAddress(false);
                          setNewAddress({ receiver_name: '', phone: '', address: '' });
                        }}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center space-x-2"
                      >
                        <i className="fa-solid fa-plus"></i>
                        <span>Thêm</span>
                      </button>
                    </div>
                  </form>
                )}

                {isEditingAddress && (
                  <form onSubmit={handleUpdateAddress} className="mb-8 p-6 bg-white rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Chỉnh sửa địa chỉ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Tên người nhận</label>
                        <input
                          type="text"
                          value={newAddress.receiver_name}
                          onChange={(e) => setNewAddress({...newAddress, receiver_name: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Số điện thoại</label>
                        <input
                          type="tel"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Địa chỉ</label>
                        <input
                          type="text"
                          value={newAddress.address}
                          onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingAddress(false);
                          setEditingAddressId(null);
                          setNewAddress({ receiver_name: '', phone: '', address: '' });
                        }}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center space-x-2"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Cập nhật</span>
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 gap-6">
                  {addresses.map((addr) => (
                    <div key={addr._id} className="bg-white p-6 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-red-300 transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="w-full">
                          <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-800 text-lg">{addr.receiver_name}</h3>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditAddress(addr)}
                                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                        <button
                          onClick={() => handleDeleteAddress(addr._id)}
                          className="text-red-600 hover:text-red-700 transition-colors duration-200"
                        >
                                <i className="fa-solid fa-trash"></i>
                        </button>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-2">
                            <span className="flex items-center text-sm text-gray-500">
                              <i className="fa-solid fa-phone text-gray-400 mr-1"></i>
                              <span className="font-semibold">Số điện thoại:</span>
                              <span className="ml-1 text-gray-800">{String(addr.phone)}</span>
                            </span>
                            <span className="flex items-center text-sm text-gray-500">
                              <i className="fa-solid fa-location-dot text-gray-400 mr-1"></i>
                              <span className="font-semibold">Địa chỉ:</span>
                              <span className="ml-1 text-gray-800">{addr.address}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {addresses.length === 0 && !isAddingAddress && !isEditingAddress && (
                  <div className="text-center py-12">
                    <i className="fa-solid fa-location-dot text-6xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500 text-lg">Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ mới!</p>
                  </div>
                )}
              </div>
            )}

            {tab === "orders" && (
              <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800">Đơn hàng của tôi</h2>
        
              <OrderCard user_id="6852bc7cdbb9b28715884c6f"/>
            </div>
            )}

            {tab === "favorites" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Sản phẩm yêu thích</h2>
                {isLoadingWishlist ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                  </div>
                ) : wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item._id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-red-300 transition-all duration-200 max-w-[180px] mx-auto">
                        <div className="relative h-24 bg-white flex items-center justify-center">
                        <img
                            src={`/upload/product/${item.product.main_image}`}
                            alt={item.product.name}
                            className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                          />
                        </div>
                        <div className="p-2">
                          <h3 className="font-medium text-gray-800 text-xs mb-1 line-clamp-2">{item.product.name}</h3>
                          <p className="text-red-600 font-bold text-xs mb-2">{item.product.price.toLocaleString('vi-VN')}đ</p>
                          <div className="flex justify-between items-center pt-2 border-t border-gray-100 gap-2">
                            <button
                              onClick={() => router.push(`/product/${item.product_id}`)}
                              className="flex items-center gap-1 px-2 py-1 rounded bg-red-50 text-red-500 text-xs font-medium hover:bg-red-500 hover:text-white transition-all duration-150"
                            >
                              <i className="fa-solid fa-eye text-xs"></i>
                              <span>Xem</span>
                            </button>
                            <button
                              onClick={() => handleRemoveFromWishlist(item.product_id)}
                              className="flex items-center justify-center px-2 py-1 rounded bg-gray-100 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all duration-150"
                              title="Xóa khỏi yêu thích"
                            >
                              <i className="fa-solid fa-trash text-xs"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <i className="fa-solid fa-heart text-6xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500 text-lg">Bạn chưa có sản phẩm yêu thích nào.</p>
                  </div>
                )}
              </div>
            )}

            {tab === "voucher" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Voucher của bạn</h2>
                <div className="flex flex-col gap-6 max-w-xl ">
                  <VoucherCard
                    voucher_name="Voucher Ưu Đãi Lớn 5"
                    voucher_code="BIGSAVE5"
                    start_date="2025-06-10T00:00:00.000+00:00"
                    end_date="2025-09-10T23:59:59.000+00:00"
                    discount_type="percentage"
                    discount_value={25}
                    minimum_order_value={300000}
                    max_discount={100000}
                    status={0}
                  />
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
