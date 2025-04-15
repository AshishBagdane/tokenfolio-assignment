import Image from "next/image";

const tokenfolio = {
  name: "Crypto Tracker",
  email: "contact@tokenfolio.co",
  avatar:
    "https://wellfound.com/cdn-cgi/image/width=140,height=140,fit=scale-down,gravity=0.5x0.5,quality=90,format=auto/https://photos.wellfound.com/startups/i/9247799-dde2c35fc49cd8c10494dd1536b21209-medium_jpg.jpg?buster=1742307463",
  backgroundImage:
    "https://static.wixstatic.com/media/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.png/v1/fill/w_2746,h_1800,al_br,q_95,enc_avif,quality_auto/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.png",
};

export function SiteHeader() {
  return (
    <div>
      <div>
        <Image
          alt="header background image"
          src={tokenfolio.backgroundImage}
          className="h-32 w-full object-cover lg:h-48"
          width={1024}
          height={256}
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Image
              alt="avatar header image"
              src={tokenfolio.avatar}
              className="size-24 rounded-b-sm ring-4 ring-white sm:size-32"
              width={256}
              height={256}
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {tokenfolio.name}
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">
            {tokenfolio.name}
          </h1>
        </div>
      </div>
    </div>
  );
}
