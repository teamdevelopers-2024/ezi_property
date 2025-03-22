const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-[3px] z-50">
      <div className="w-12 h-12 rounded-full animate-spin-alternate border-4 border-[#262771] border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
