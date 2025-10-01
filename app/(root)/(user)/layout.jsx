import { Comfortaa } from "next/font/google";
import Header from "@/components/custom/user/header";
import Footer from "@/components/custom/user/footer";

const comfortaaFont = Comfortaa({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});
const layout = ({ children }) => {
  return (
    <div className={comfortaaFont.className}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
