function App() {
  return (
    <div>
      <div className="relative w-screen">
      <img className="mx-auto py-24" src="landing-girl-illus.png" alt="" />
        {/* <!-- Blob 1 --> */}
        <div className="absolute w-24 h-24 rounded-full mix-blend-multiply filter blur-2xl opacity-70 top-0 left-52" style={{backgroundColor: "#EDF046"}}></div>

        {/* <!-- Blob 2 --> */}
        <div className="absolute w-24 h-24 rounded-full mix-blend-multiply filter blur-2xl opacity-60 top-28 left-0" style={{backgroundColor: "#46F080"}}></div>

        {/* <!-- Blob 3 --> */}
        <div className="absolute w-24 h-24 rounded-full mix-blend-multiply filter blur-3xl opacity-60 top-44 right-0" style={{backgroundColor: "#2555FF"}}></div>

        {/* <!-- Blob 4 --> */}
        <div className="absolute w-24 h-24 rounded-full mix-blend-multiply filter blur-2xl opacity-60 top-72 left-0" style={{backgroundColor: "#46BDF0"}}></div>

        {/* <!-- Content --> */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-gray-800">
            Taskify
          </h1>
        </div>
      </div>
    </div>
  );
}
export default App;
