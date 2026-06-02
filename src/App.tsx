import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";

import Home from "./routes/index";
import About from "./routes/about";
import Careers from "./routes/careers";
import JobDetail from "./routes/job-detail";
import Contact from "./routes/contact";
import Cravora from "./routes/cravora";
import Innovation from "./routes/innovation";
import Partners from "./routes/partners";
import Privacy from "./routes/privacy";
import Terms from "./routes/terms";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden border-b border-border py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] animate-pulse [background-image:radial-gradient(circle_at_50%_50%,var(--green),transparent_40%),radial-gradient(circle_at_80%_20%,var(--navy),transparent_50%)]"
        style={{ animationDuration: "6s" }}
      />
      <div className="container-x relative z-10 mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur shadow-[0_0_20px_rgba(2,29,66,0.1)]">
          <span className="font-display text-lg font-medium text-muted-foreground">404</span>
        </div>
        <h1 className="mt-8 font-display text-5xl font-medium tracking-[-0.04em] text-foreground md:text-6xl">
          Signal lost.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          The page you are looking for has been moved, renamed, or no longer exists in the BiovaCo
          ecosystem.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-8 py-4 text-sm font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)] dark:hover:bg-white"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="careers/:roleKey" element={<JobDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cravora" element={<Cravora />} />
          <Route path="innovation" element={<Innovation />} />
          <Route path="partners" element={<Partners />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
