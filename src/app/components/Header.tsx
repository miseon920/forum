import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="navbar"> 
        <Link href="/" className="logo">Appleforum</Link> 
        <Link href="/list">List</Link>
        <Link href="/write">Write</Link>
    </div>
  )
}
