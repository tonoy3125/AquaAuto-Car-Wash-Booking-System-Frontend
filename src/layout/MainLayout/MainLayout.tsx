import Comparison from "@/components/Comparison/Comparison";
import ScrollToTop from "@/components/ScrollToTop.tsx/ScrollToTop";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Outlet />
      <div className="fixed flex items-center bottom-[20px] right-[20px] center gap-[20px]">
        <Comparison />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default MainLayout;
