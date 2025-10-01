import BreadCrumb from "@/components/custom/user/breadCrumb";

const breadCrumb = {
  title: "Terms, & Conditions",
  links: [
    {
      label: "Terms, & Conditions",
    },
  ],
};
const TermsAndConditionsPage = () => {
  return (
    <div>
      <BreadCrumb props={breadCrumb} />
      <div className="lg:px-40 px-5 py-20">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-yellow-600">Hattah</span>. By
          accessing or using our website, you agree to be bound by the following
          terms and conditions. Please read them carefully.
        </p>

        <p className="mt-3 text-gray-700 leading-relaxed">
          If you do not agree with any part of these terms, please do not use
          our website.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          1. Use of Our Website
        </h2>
        <ul className="list-disc ps-6 mt-3 space-y-2 text-gray-700">
          <li>
            You must be at least 18 years old or visiting under the supervision
            of a parent or guardian.
          </li>
          <li>
            You agree to use our website for lawful purposes only and not for
            any fraudulent or harmful activity.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          2. Product Information
        </h2>
        <ul className="list-disc ps-6 mt-3 space-y-2 text-gray-700">
          <li>
            We strive to display accurate product details, prices, and
            availability, but errors may occur.
          </li>
          <li>
            We reserve the right to correct any inaccuracies and update
            information at any time without prior notice.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          3. Orders & Payments
        </h2>
        <ul className="list-disc ps-6 mt-3 space-y-2 text-gray-700">
          <li>
            Placing an order does not guarantee product availability. Orders may
            be canceled or adjusted if stock is unavailable.
          </li>
          <li>
            All payments must be made through our secure payment gateways. We do
            not store card information.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          4. Returns & Refunds
        </h2>
        <ul className="list-disc ps-6 mt-3 space-y-2 text-gray-700">
          <li>
            Please refer to our Return Policy for detailed information on
            returns, exchanges, and refund eligibility.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          5. Intellectual Property
        </h2>
        <ul className="list-disc ps-6 mt-3 space-y-2 text-gray-700">
          <li>
            All content on{" "}
            <span className="font-semibold text-yellow-600">Hattah</span>,
            including logos, images, and text, is the property of Hattah and
            protected by copyright laws.
          </li>
          <li>
            You may not use, copy, or reproduce any material without our written
            consent.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          6. Limitation of Liability
        </h2>
        <ul className="list-disc ps-6 mt-3 space-y-2 text-gray-700">
          <li>
            We are not liable for any damages resulting from the use or
            inability to use our website or products.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          7. Changes to Terms
        </h2>
        <ul className="list-disc ps-6 mt-3 space-y-2 text-gray-700">
          <li>
            We may update these Terms & Conditions at any time. Continued use of
            the website implies acceptance of the new terms.
          </li>
        </ul>

        <p className="mt-6 text-gray-700 leading-relaxed">
          If you have any questions regarding these terms, please contact our
          customer support team.
        </p>

        <p className="mt-3 text-gray-700 leading-relaxed">
          Thank you for choosing{" "}
          <span className="font-semibold text-yellow-600">Hattah</span>. We
          value your trust and are committed to delivering a secure and reliable
          shopping experience.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
