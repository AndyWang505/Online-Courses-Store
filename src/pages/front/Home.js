function Home() {
  return (
    <>
      <main>
        <div className="main-bg bg-cover bg-center min-h-screen flex items-center justify-center">
          <div class="text-white text-center p-8 bg-black bg-opacity-50 rounded-lg">
            <h1 class="text-4xl font-bold">Welcome</h1>
            <p class="mt-4 text-lg">This is a sample page with a background image using Tailwind CSS.</p>
          </div>
        </div>
        <div>
          <h2>熱門課程</h2>
          <ul>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
          </ul>
        </div>
        <div>
          <h2>師資團隊</h2>
          <ul>
            <li>Lorem.</li>
            <li>Lorem.</li>
            <li>Lorem.</li>
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