import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Next.js Dashboard",
  description: "User authentication & dashboard with filtering and sorting.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
