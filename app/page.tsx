import Link from "next/link"

function HomePage() {
  return (
    <div>
      <h1 className="text-7xl mb-8 font-bold">
        HomePage
      </h1>
      <Link href='/client' className="btn btn-outline btn-primary text-2xl mr-6">
        Get start
      </Link>
      <Link href='/sd' className="btn btn-primary text-2xl">
        Go to SD
      </Link>
    </div>
  )
}

export default HomePage