import HomeSlider from "@/components/custom/user/homeSlider";
import HomeBanner1 from "@/components/custom/user/homeBanner1";
import HomeFeaturedProducts from "@/components/custom/user/homeFeaturedProducts";
import HomeBanner2 from "@/components/custom/user/homeBanner2";
import HomeCustomerReviews from "@/components/custom/user/homeCustomerReviews";
import HomeServices from "@/components/custom/user/homeServices";

const HomePage = () => {
  return (
    <div>
      <section>
        <HomeSlider />
      </section>
      <section>
        <HomeBanner1 />
      </section>
      <section>
        <HomeFeaturedProducts />
      </section>
      <section>
        <HomeBanner2 />
      </section>
      <section>
        <HomeCustomerReviews />
      </section>
      <section>
        <HomeServices />
      </section>
    </div>
  );
};

export default HomePage;
