function Home() {
  return (
    <>
      <main>
        <div className="main-bg bg-cover bg-center flex items-center justify-center" style={{ height: `calc(90vh - 72px)` }}>
          <div className="text-white text-center p-8 bg-black bg-opacity-50 rounded-lg">
            <h1 className="text-4xl font-bold">Welcome</h1>
            <p className="mt-4 text-lg">This is a sample page with a background image using Tailwind CSS.</p>
          </div>
        </div>
        <div className="container max-w-7xl mx-auto p-6">
          <h2 className="text-4xl font-bold text-center my-6">熱門課程</h2>
          <ul className="flex justify-between space-x-4">
            <li>
              <div className="w-full px-3 mb-4">
                <div className="card border-0 relative mb-4">
                  <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">Lorem ipsum</h4>
                    <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                    <p className="text-gray-500 mt-3">NT$ 1,200</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="w-full px-3 mb-4">
                <div className="card border-0 relative mb-4">
                  <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">Lorem ipsum</h4>
                    <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                    <p className="text-gray-500 mt-3">NT$ 1,200</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="w-full px-3 mb-4">
                <div className="card border-0 relative mb-4">
                  <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">Lorem ipsum</h4> 
                    <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                    <p className="text-gray-500 mt-3">NT$ 1,200</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="container max-w-7xl mx-auto p-6">
          <h2 className="text-4xl font-bold text-center my-6">師資團隊</h2>
          <ul className="flex justify-between space-x-4">
            <li>
              <div className="w-full px-3 mb-4">
                <div className="card border-0 relative mb-4">
                  <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">Lorem ipsum</h4>
                    <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                    <p className="text-gray-500 mt-3">NT$ 1,200</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="w-full px-3 mb-4">
                <div className="card border-0 relative mb-4">
                  <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">Lorem ipsum</h4>
                    <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                    <p className="text-gray-500 mt-3">NT$ 1,200</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="w-full px-3 mb-4">
                <div className="card border-0 relative mb-4">
                  <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">Lorem ipsum</h4> 
                    <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                    <p className="text-gray-500 mt-3">NT$ 1,200</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h2>合作企業</h2>
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
      </main>
    </>
  )
}

export default Home;