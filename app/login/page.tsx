import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full">
          {/* Branding */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-600/20">
              P
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Product Admin
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your products from one place
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-semibold text-slate-900">
                Welcome back
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Sign in to access your dashboard
              </p>
            </div>

            <LoginForm />

            {/* Demo Credentials */}
            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Demo credentials
              </p>

              <div className="mt-2 space-y-1 text-sm text-slate-600">
                <p>
                  Username:{" "}
                  <span className="font-medium text-slate-900">
                    emilys
                  </span>
                </p>

                <p>
                  Password:{" "}
                  <span className="font-medium text-slate-900">
                    emilyspass
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Product Admin Dashboard
          </p>
        </div>
      </div>
    </main>
  );
}