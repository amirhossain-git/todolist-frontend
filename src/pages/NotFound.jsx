import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-14">
        <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-sm dark:border-slate-800/70 dark:bg-slate-950/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-200">
              <FiAlertTriangle />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">404</div>
              <div className="text-2xl font-extrabold tracking-tight">Page not found</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            The page you’re looking for doesn’t exist, or it was moved.
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button variant="primary">
                <FiArrowLeft />
                Back to dashboard
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

