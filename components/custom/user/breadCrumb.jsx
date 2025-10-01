import Link from "next/link";
import { USER_HOME } from "@/routes/UserRoute";

const BreadCrumb = ({ props }) => {
  return (
    <div className="py-16 flex justify-center items-center bg-[url('/assets/images/page-top.jpg')] bg-cover bg-bottom">
      <div>
        <h1 className="text-2xl text-center font-bold">{props.title}</h1>
        <ul className="flex justify-center gap-1">
          <li>
            <Link className="font-semibold" href={USER_HOME}>
              Home
            </Link>
          </li>
          {props.links.map((item, index) => (
            <li key={index}>
              <span className="mx-1">/</span>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumb;
