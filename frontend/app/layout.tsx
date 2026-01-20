import "./globals.css";

export default function RootLayout({children}: { children: React.ReactNode;}) { //children prop and type
  return (
    <html >
      <body>
        {children}
      </body>
    </html>
  );
}
