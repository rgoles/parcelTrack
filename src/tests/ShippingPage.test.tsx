import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { ShippingPage } from "@/components/pages/ShippingPage"

describe("ShippingPage", () => {
  test("filters packages by tracking number", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ShippingPage />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/filter tracking number/i)

    await user.type(input, "CA200604502")

    expect(screen.getByText("CA200604502")).toBeInTheDocument()
    expect(screen.queryByText("CA485451171")).not.toBeInTheDocument()
  })
})
