import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>Fiverr Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-green-600">fiverr.</h1>
          <input
            type="text"
            placeholder="What service are you looking for today?"
            className="ml-4 p-2 border rounded-md"
          />
        </div>
        <nav>
          <a href="#" className="mx-2 text-gray-700">Fiverr Pro</a>
          <a href="#" className="mx-2 text-gray-700">Explore</a>
          <a href="#" className="mx-2 text-gray-700">Become a Seller</a>
          <a href="#" className="mx-2 text-green-600">Join</a>
          <a href="#" className="mx-2">Sign in</a>
        </nav>
      </header>

      <main className="p-5">
        <h2 className="text-xl font-semibold mb-4">Popular services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-green-600 text-white p-4 rounded-lg text-center">
            <h3>Website Development</h3>
          </div>
          <div className="bg-orange-400 text-white p-4 rounded-lg text-center">
            <h3>Logo Design</h3>
          </div>
          <div className="bg-green-800 text-white p-4 rounded-lg text-center">
            <h3>SEO</h3>
          </div>
          <div className="bg-purple-600 text-white p-4 rounded-lg text-center">
            <h3>Architecture & Interior Design</h3>
          </div>
          <div className="bg-green-700 text-white p-4 rounded-lg text-center">
            <h3>Social Media Marketing</h3>
          </div>
          <div className="bg-brown-600 text-white p-4 rounded-lg text-center">
            <h3>Voice Over</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
