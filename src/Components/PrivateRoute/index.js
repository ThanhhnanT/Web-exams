import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCookie } from "../../Helpers/cookies";

function PrivateRouter() {
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setIsLoading(false); // Kết thúc trạng thái tải
  }, []);

  if (isLoading) {
    // Hiển thị trạng thái loading trong khi kiểm tra
    return <div>Đang kiểm tra trạng thái đăng nhập...</div>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouter;
