import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="list-bg">
        <h1>Not found – 404!</h1>
        <div>
            <Link href="/">Home</Link>
        </div>
    </div>
  )
}