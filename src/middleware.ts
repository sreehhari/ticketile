import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "THEATER_OWNER",
    },
  },
)

export const config = { matcher: ["/dashboard"] }