import Image from "next/image";
import logo from "../../../public/images/undraw_no-data_ig65.svg";

export default function NoData() {
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
