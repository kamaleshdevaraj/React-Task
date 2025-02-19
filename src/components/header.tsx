const Header = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-sm  text-neutral-500 font-semibold">Your To-Do's</h2>
      <button className="flex items-center text-sky-600 font-medium shadow-md rounded-md px-2 py-2 cursor-pointer">
        <span className="text-sm mx-1">+</span> Create Schedule
      </button>
    </div>
  );
};

export default Header;
