import { vi, expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";

expect.extend(toHaveNoViolations);

const IntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserver);
