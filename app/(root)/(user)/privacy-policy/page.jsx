import BreadCrumb from "@/components/custom/user/breadCrumb";

const breadCrumb = {
  title: "Privacy Policy",
  links: [
    {
      label: "Privacy Policy",
    },
  ],
};
const PrivacyPolicyPage = () => {
  return (
    <div>
      <BreadCrumb props={breadCrumb} />
      <div className="lg:px-40 px-5 py-20">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">
          Privacy Policy
        </h1>

        <p className="text-gray-700 leading-relaxed">
          At <span className="font-semibold text-yellow-600">Hattah</span>, we
          are committed to protecting your privacy and ensuring that your
          personal information is handled in a safe and responsible manner.
        </p>

        <p className="mt-3 text-gray-700 leading-relaxed">
          This Privacy Policy outlines how we collect, use, and safeguard your
          information when you visit our website or make a purchase.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          Information We Collect
        </h2>
        <ul className="list-disc ps-6 mt-3 space-y-2 text-gray-700">
          <li>
            <b className="text-orange-600">Personal Information:</b> Such as
            your name, email address, phone number, and shipping/billing
            addresses, provided during account registration or checkout.
          </li>
          <li>
            <b className="text-orange-600">Payment Details:</b> Collected
            securely through encrypted payment gateways.
          </li>
          <li>
            <b className="text-orange-600">Usage Data:</b> Including your
            browser type, IP address, pages visited, and time spent on the site
            to help us improve user experience.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          How We Use Your Information
        </h2>
        <ul className="list-disc ps-6 mt-3 space-y-2 text-gray-700">
          <li>To process your orders and provide customer support.</li>
          <li>
            To personalize your shopping experience and improve our services.
          </li>
          <li>
            To send order updates, promotional offers, and newsletters (you may
            opt out at any time).
          </li>
          <li>To ensure our website is secure and functioning properly.</li>
        </ul>

        <p className="mt-6 text-gray-700 leading-relaxed">
          We do not sell, rent, or share your personal information with third
          parties, except when necessary to fulfill your order or comply with
          legal obligations.
        </p>

        <p className="mt-3 text-gray-700 leading-relaxed">
          By using our website, you consent to the practices outlined in this
          Privacy Policy. We may update this policy from time to time, and any
          changes will be reflected on this page.
        </p>

        <p className="mt-3 text-gray-700 leading-relaxed">
          If you have any questions or concerns regarding our Privacy Policy,
          please contact our support team.
        </p>

        <p className="mt-3 text-gray-700 leading-relaxed">
          Thank you for trusting{" "}
          <span className="font-semibold text-yellow-600">Hattah</span>. Your
          privacy is important to us.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
