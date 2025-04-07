const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-[3px] z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3703A]"></div>
    </div>
  );
};

export default Spinner;
