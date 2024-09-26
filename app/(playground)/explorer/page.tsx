import RecentRegisteredUser from "@/components/recent-registered-user";
import SearchSection from "@/components/search-section";

const page = () => {
  return (
    <div
      className="flex-1 ml-[50px] md:ml-[250px] lg:mr-[400px] overflow-y-scroll 
    flex flex-col justify-start min-h-full  mt-7 mb-10 w-full"
    >
      <div className="mb-5">
        <h1 className="font-semibold text-3xl">Explorer</h1>
      </div>
      <SearchSection />
      <div className="my-10 flex flex-col gap-7">
        <h1 className="text-2xl font-semibold text-center border-t border-zinc-800 pt-5">
          Recent registered users
        </h1>
        <RecentRegisteredUser />
      </div>
    </div>
  );
};

export default page;
