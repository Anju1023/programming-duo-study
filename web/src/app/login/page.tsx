import { login, loginWithGoogle, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Code2 } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Code2 className="h-12 w-12 text-primary mb-2" />
          <h2 className="text-3xl font-extrabold tracking-tight">
            Welcome to CodePop
          </h2>
          <p className="text-muted-foreground mt-2">
            Sign in to continue your learning journey
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl border shadow-sm space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="hello@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            
            <div className="flex flex-col gap-2 pt-2">
              <Button formAction={login} className="w-full">
                Sign In
              </Button>
              <Button formAction={signup} variant="outline" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form action={loginWithGoogle}>
             <Button variant="secondary" className="w-full" type="submit">
              Google
             </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
