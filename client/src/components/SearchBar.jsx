const SearchBar = ({ tasks, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();
  //   console.log(tasks.filter((task) => task.title.includes('L')));

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(tasks);
    const resultsArray = tasks.filter((task) =>
      task.title.includes(e.target.value)
    );
    // console.log(resultsArray);

    setSearchResults(resultsArray);
  };

  return (
    <div>
      <div
        className="w-full px-4 h-10 py-2 align-middle rounded-lg flex gap-2 "
        style={{ backgroundColor: "#F1F1F1" }}
      >
        <img src="search.svg" className="" alt="" />
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Search task"
            className="search_text text-base bg-transparent focus:outline-none"
            id="search"
            type="text"
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </div>
  );
};
export default SearchBar;
