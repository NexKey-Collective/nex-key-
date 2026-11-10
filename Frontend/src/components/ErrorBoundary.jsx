import { Component } from "react";
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.error("Application render failed:", error.message);
  }
  render() {
    if (this.state.failed)
      return (
        <main className="min-h-screen grid place-items-center p-6">
          <div role="alert" className="max-w-md space-y-4">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p>Please reload the page to try again.</p>
            <button
              className="rounded-full bg-brand text-white px-6 py-3"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
            <a className="block underline" href="/">
              Return home
            </a>
          </div>
        </main>
      );
    return this.props.children;
  }
}
