import BreadCrumb from "@/components/custom/user/breadCrumb";

const breadCrumb = {
  title: "About",
  links: [
    {
      label: "About",
    },
  ],
};
const AboutPage = () => {
  return (
    <div>
      <BreadCrumb props={breadCrumb} />
      <div className="lg:px-40 px-5 py-20">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">About Us</h1>

        <p className="text-gray-700 leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-yellow-600">Hattah</span>, your
          one-stop destination for quality, convenience, and innovation in
          online shopping.
        </p>

        <p className="text-gray-700 leading-relaxed mt-3">
          Founded with a mission to redefine the eCommerce experience, we are
          passionate about bringing you a carefully curated selection of
          products that meet your everyday needs— whether it's fashion,
          electronics, home essentials, beauty, or lifestyle goods. Our goal is
          to deliver not just products, but value, trust, and a seamless
          shopping journey.
        </p>

        <p className="mt-6 text-lg font-medium text-gray-800">
          What sets us apart:
        </p>
        <ul className="list-disc ps-6 mt-3 space-y-2 text-gray-700">
          <li>
            <b className="text-orange-600">Customer Satisfaction:</b> Your
            happiness is our priority. From browsing to checkout, we&apos;re
            here to make your shopping experience effortless and enjoyable.
          </li>

          <li>
            <b className="text-orange-600">Quality & Affordability:</b> We
            partner directly with trusted suppliers and brands to offer
            high-quality products at competitive prices.
          </li>

          <li>
            <b className="text-orange-600">Fast & Reliable Shipping:</b> We
            understand the excitement of online shopping, so we work hard to
            ensure your orders arrive on time.
          </li>

          <li>
            <b className="text-orange-600">Secure Shopping:</b> Your data is
            safe with us. Our platform uses cutting-edge encryption and payment
            security technologies.
          </li>
        </ul>

        <p className="mt-6 text-gray-700 leading-relaxed">
          As a growing brand, we believe in constantly evolving—adding new
          products, improving our services, and listening to what our customers
          want. Whether you're shopping for yourself or finding the perfect
          gift, we&apos;re here to help you discover something you'll love.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Thank you for choosing{" "}
          <span className="font-semibold text-yellow-600">Hattah</span>.
          Let&apos;s make shopping smarter, simpler, and more
          enjoyable—together.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
