import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

const ButtonLoading = ({
  className,
  text,
  loading,
  type,
  onClick,
  ...props
}) => {
  return (
    <Button
      className={cn("", className)}
      disabled={loading}
      type={type}
      onClick={onClick}
      {...props}
    >
      {loading && <Loader2Icon className="animate-spin" />}
      {text}
    </Button>
  );
};

export default ButtonLoading;
