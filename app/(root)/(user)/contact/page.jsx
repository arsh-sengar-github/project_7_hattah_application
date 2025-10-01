import BreadCrumb from "@/components/custom/user/breadCrumb";
import { IoLocation } from "react-icons/io5";
import { IoIosMailUnread } from "react-icons/io";
import Link from "next/link";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaThreads } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const breadCrumb = {
  title: "Contact",
  links: [{ label: "Contact" }],
};
const ContactPage = () => {
  return (
    <div>
      <BreadCrumb props={breadCrumb} />

      <div className="lg:px-40 px-5 py-20">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">
          Get in Touch
        </h1>
        <p className="text-gray-600 mb-10 leading-relaxed">
          Have questions, feedback, or need support? We&apos;d love to hear from
          you. Reach out through any of the options below, or simply use the
          form to send us a message.
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <ul className="space-y-5 text-gray-700">
              <li className="flex items-start gap-3">
                <IoLocation
                  className="text-orange-500 shrink-0 mt-1"
                  size={25}
                />
                <p>
                  Hattah, Headquater - 1 <br />
                  Tata-Hata Main Road, Bistupur <br />
                  Jamshedpur, Jharkhand, India <br />
                  Pin - 831001
                </p>
              </li>
              <li className="flex items-center gap-3">
                <IoIosMailUnread
                  className="text-orange-500 shrink-0"
                  size={25}
                />
                <Link
                  className="hover:text-orange-600"
                  href="mailto:arshsengar.work@gmail.com"
                >
                  arshsengar.work@gmail.com
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneVolume className="text-orange-500 shrink-0" size={25} />
                <Link
                  className="hover:text-orange-600"
                  href="tel:+91-706-186-7938"
                >
                  +91-706-186-7938
                </Link>
              </li>
            </ul>

            <div className="flex gap-3 mt-6">
              <Link href="">
                <FaFacebook
                  className="text-orange-500 hover:text-orange-600"
                  size={28}
                />
              </Link>
              <Link href="">
                <FaInstagram
                  className="text-orange-500 hover:text-orange-600"
                  size={28}
                />
              </Link>
              <Link href="">
                <FaThreads
                  className="text-orange-500 hover:text-orange-600"
                  size={28}
                />
              </Link>
              <Link href="">
                <FaXTwitter
                  className="text-orange-500 hover:text-orange-600"
                  size={28}
                />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            <form className="space-y-5">
              <div>
                <label className="block mb-1 text-gray-700">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
