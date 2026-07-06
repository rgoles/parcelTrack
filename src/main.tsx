import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { TooltipProvider } from "./components/ui/tooltip.tsx"

import { BrowserRouter, Route, Routes } from "react-router"
import { MainAdminLayout } from "./components/templates/MainAdminLayout.tsx"
import { ShippingPage } from "./components/pages/ShippingPage.tsx"
import { TestPage } from "./components/pages/TestPage.tsx"
import { PackageDetailsPage } from "./components/pages/PackageDetailsPage.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route
              path="packages"
              element={<MainAdminLayout children={<ShippingPage />} />}
            />
            <Route path="test" element={<TestPage />} />
            <Route
              path="packages/:trackingNumber"
              element={<PackageDetailsPage />}
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
