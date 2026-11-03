import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Fact, TextWithTodos } from "./Todo";

describe("placeholder rendering", () => {
  it("shows confirmed facts as plain text", () => {
    render(<Fact value="aditi@movingcircletherapy.com" />);
    expect(screen.getByText("aditi@movingcircletherapy.com").tagName).not.toBe("MARK");
  });

  it("marks TODO facts visibly and strips the prefix", () => {
    const { container } = render(<Fact value="TODO: phone number" />);
    const mark = container.querySelector("mark[data-todo]");
    expect(mark).toHaveTextContent("phone number");
    expect(mark).not.toHaveTextContent("TODO");
  });

  it("highlights inline TODO segments within prose", () => {
    const { container } = render(<TextWithTodos text="Pay from TODO: lowest fee. Just ask." />);
    expect(container.querySelectorAll("mark[data-todo]")).toHaveLength(1);
    expect(container).toHaveTextContent("Just ask.");
  });
});
