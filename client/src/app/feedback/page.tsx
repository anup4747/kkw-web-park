"use client";

export default function FeedbackPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Feedback</h1>
      <form
        className="space-y-4 border rounded p-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Feedback submitted (demo)");
        }}
      >
        <div className="space-y-1">
          <label htmlFor="subject" className="text-sm">Subject</label>
          <input id="subject" className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="space-y-1">
          <label htmlFor="details" className="text-sm">Details (bugs, ideas)</label>
          <textarea id="details" rows={5} className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="rounded bg-black text-white px-3 py-2">Send</button>
      </form>
    </div>
  );
}


