import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { EnquiryForm, type EnquiryActionData } from "./EnquiryForm";

function renderForm(actionData?: EnquiryActionData) {
  const Stub = createRoutesStub([
    { path: "/", Component: () => <EnquiryForm actionData={actionData} /> },
  ]);
  return render(<Stub initialEntries={["/"]} />);
}

describe("EnquiryForm", () => {
  it("labels every field and marks optional ones in words", () => {
    renderForm();
    expect(screen.getByLabelText("Your name")).toBeRequired();
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/Pronouns/)).not.toBeRequired();
    expect(screen.getByText("How should we contact you?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "privacy policy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
  });

  it("shows an inline error after leaving an invalid field", async () => {
    const user = userEvent.setup();
    renderForm();
    const email = screen.getByRole("textbox", { name: "Email" });
    await user.type(email, "not-an-email");
    await user.tab();
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(screen.getAllByText(/doesn't look quite right/).length).toBeGreaterThan(0);
  });

  it("blocks submit and focuses an error summary linking to each field", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: "Send my enquiry" }));
    const summary = screen.getByRole("heading", { name: /things to check/ });
    expect(summary).toBeVisible();
    expect(screen.getByRole("link", { name: "Please tell us your name." })).toHaveAttribute(
      "href",
      "#enquiry-name",
    );
  });

  it("shows the friendly confirmation after success", () => {
    renderForm({ status: "success" });
    expect(
      screen.getByRole("heading", { name: /we'll be in touch within 24 hours/ }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Send my enquiry" })).not.toBeInTheDocument();
  });

  it("restores submitted values and server errors", () => {
    renderForm({
      status: "invalid",
      errors: { email: "That email doesn't look quite right — please check it." },
      values: { name: "Sam", email: "x" },
    });
    expect(screen.getByLabelText("Your name")).toHaveValue("Sam");
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
  });
});
