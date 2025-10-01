import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = ({ breadCrumbData }) => {
  return (
    <Breadcrumb className="my-2">
      <BreadcrumbList>
        {breadCrumbData.length > 0 &&
          breadCrumbData.map((dataItem, index) => {
            return index !== breadCrumbData.length - 1 ? (
              <div className="flex items-center" key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={dataItem.href}>
                    {dataItem.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            ) : (
              <div className="flex items-center" key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="font-semibold"
                    href={dataItem.href}
                  >
                    {dataItem.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </div>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
