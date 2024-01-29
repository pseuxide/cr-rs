import Link from 'next/link'

export const Header = () => {

  return (
    <div className="header">
      <div className="header-left">
          <h1>
            <Link href={`/`} >crud-rust</Link>
          </h1>
        </div>
      <div className="header-right">
      </div>
    </div>
  )
}
