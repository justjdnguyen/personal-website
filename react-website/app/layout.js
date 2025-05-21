import "./globals.css";

export const metadata = {
  title: "Jimmy Nguyen - Software Engineer",
  description:
    "Personal portfolio website of Jimmy Nguyen, a Software Engineer and Full Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
