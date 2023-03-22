import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { Heading, Image } from "@chakra-ui/react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className={styles.container}>
        <Image src="/assets/under-construction.png" alt="Blitz.js Logo" className={styles.logo} />
        <Heading color="#1e2718" as="h1" textAlign="center" size="lg" transform="auto" scaleX={0.7}>
          Guklak make website...
        </Heading>
        <Heading color="#1e2718" as="h2" textAlign="center" size="md" transform="auto" scaleX={0.7}>
          Check back later...
        </Heading>
        <div className={styles.buttonContainer}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
        <main className={styles.main}></main>
      </div>
    </Layout>
  )
}

export default Home
