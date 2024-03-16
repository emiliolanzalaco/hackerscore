'use client'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/layout.module.css'
import { useAccount } from 'wagmi'
export function Layout({ children }: { children: React.ReactNode }) {
  const account = useAccount()

  return (
    <div className={styles.layout}>
      <nav className={`${styles.header} navbar-header`}>
        <div>
          <Link href='/' className='navbar-brand'>
            hackerscore
          </Link>
        </div>

        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav navbar-center'>
            <li>
              <Link href='/feed'>Feed</Link>
            </li>
            <li>
              <Link href={`/${account.address}`}>Profile</Link>
            </li>
          </ul>
        </div>
        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav navbar-center'>
            <li>
              <button className='btn btn-lg btn-primary'>connect</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className={styles.main}>{children}</div>
      <div className={styles.footer}></div>
    </div>
  )
}
