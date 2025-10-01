import PanelNavigation from "./panelNavigation";

const PanelLayout = ({ children }) => {
  return (
    <div className="my-16 lg:px-32 px-4 flex lg:flex-nowrap flex-wrap gap-4">
      <div className="lg:mb-0 mb-4 lg:w-64 w-full">
        <PanelNavigation />
      </div>
      <div className="lg:w-[calc(100%-16rem)] w-full">{children}</div>
    </div>
  );
};

export default PanelLayout;
