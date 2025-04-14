import Image from "next/image";
import logo from "../../../public/images/undraw_empty_4zx0.svg";

export default function EmptyState() {
  return (
    <Image
      src={logo}
      alt="Empty State"
      className="h-full w-full"
      width={200}
      height={200}
    />
  );
}
