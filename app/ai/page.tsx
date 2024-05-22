import Link from "next/link"

const AIPage = () => {
  return (
    <div>
      <h1 className="text-7xl m-6">
        AI功能Demo
      </h1>

      <Link href='/ai/cn2en' className="btn btn-primary text-2xl">
        中文转英文
      </Link>
    </div>
  )
}

export default AIPage