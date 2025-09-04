"use client";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form
        className="space-y-4 border rounded p-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Logged in (demo)");
        }}
      >
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm">Email</label>
          <input id="email" type="email" required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm">Password</label>
          <input id="password" type="password" required className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" className="w-full rounded bg-black text-white px-3 py-2">Sign in</button>
      </form>
    </div>
  );
}


