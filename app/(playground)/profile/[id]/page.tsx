const page = ({ params }: { params: any }) => {
  const id = params.id;
  return (
    <div
      className="flex-1 ml-[50px] md:ml-[250px] lg:mr-[400px] overflow-y-scroll 
  flex flex-col justify-start min-h-full  mt-7 mb-10 w-full"
    >
      page
    </div>
  );
};

export default page;
