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
      <Link href='/upload' className="btn btn-outline btn-primary text-2xl mr-6">
        Upload Demo
      </Link>
      <Link href='/sd' className="btn btn-primary text-2xl">
        Go to SD
      </Link>
      <br />
      <Link href='/coze' className="btn btn-outline text-2xl my-8">
        同上一堂课课程智能推荐
      </Link>
    </div>
  )
}

export default HomePage