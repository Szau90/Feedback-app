const LoadingSpinner = () => {
  return (
    <div className=" mt-4 inline-block h-[80px] w-[80px] after:m-[8px] after:block after:h-[34px] after:w-[34px] after:animate-spin after:rounded-[50%] after:border-2 after:border-solid after:border-black after:border-b-black after:border-l-transparent after:border-r-transparent after:border-t-black after:content-[''] "></div>
  );
};

export default LoadingSpinner;
