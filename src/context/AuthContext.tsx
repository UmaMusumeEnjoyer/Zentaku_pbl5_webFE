// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect,type ReactNode } from 'react';

// 1. Import hook và types từ file shared-logic bạn vừa tạo
// (Giả sử bạn để file đó ở đường dẫn này, hãy điều chỉnh nếu khác)
import { useAuth as useSharedAuth, type UseAuthReturn } from '@umamusumeenjoyer/shared-logic'; 

// Tạo Context với kiểu dữ liệu là giá trị trả về của useAuth hoặc null
const AuthContext = createContext<UseAuthReturn | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 2. Sử dụng logic từ hook shared
  const authLogic = useSharedAuth();
  
  // 3. LOGIC BỔ SUNG: Khôi phục phiên đăng nhập khi F5 (Refresh trang)
  // Hook useAuth của bạn có login/logout nhưng chưa có đoạn tự chạy khi mount component
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      const username = localStorage.getItem('username');

      // Nếu có token và username trong storage nhưng chưa có user trong state
      if (token && username && !authLogic.user) {
        // Gọi hàm fetchUserInfo có sẵn trong hook của bạn
        await authLogic.fetchUserInfo(username);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ chạy 1 lần khi App mount

  return (
    <AuthContext.Provider value={authLogic}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook để các component con sử dụng (Header, AuthPage...)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};