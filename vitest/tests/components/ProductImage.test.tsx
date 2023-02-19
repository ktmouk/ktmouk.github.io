import { render, screen, cleanup } from "@testing-library/react";
import { ProductImage } from "@/components/ProductImage";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

describe("ProductImage", () => {
  afterEach(cleanup);

  describe("when it is rendered", () => {
    it("does have no a11y violations", async () => {
      const { container } = render(
        <ProductImage
          original={{
            src: "original.jpg",
            alt: "original",
            width: 200,
            height: 100,
          }}
          thumbnail={{
            src: "thumbnail.jpg",
            alt: "thumbnail",
            width: 100,
            height: 50,
          }}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("renders a thumbnail image", () => {
      render(
        <ProductImage
          original={{
            src: "original.jpg",
            alt: "original",
            width: 200,
            height: 100,
          }}
          thumbnail={{
            src: "thumbnail.jpg",
            alt: "thumbnail",
            width: 100,
            height: 50,
          }}
        />
      );
      const thumbnail = screen.getByRole("img", { name: "thumbnail" });
      expect(thumbnail).toHaveAttribute("src", "thumbnail.jpg");
      expect(thumbnail).toHaveAttribute("width", "100");
      expect(thumbnail).toHaveAttribute("height", "50");
    });

    it("does not show an original image", () => {
      render(
        <ProductImage
          original={{
            src: "original.jpg",
            alt: "original",
            width: 200,
            height: 100,
          }}
          thumbnail={{
            src: "thumbnail.jpg",
            alt: "thumbnail",
            width: 100,
            height: 50,
          }}
        />
      );
      expect(
        screen.queryByRole("img", { name: "original" })
      ).not.toBeInTheDocument();
    });
  });

  describe("when a user clicks a thumbnail", () => {
    it("shows a original image", async () => {
      render(
        <ProductImage
          original={{
            src: "original.jpg",
            alt: "original",
            width: 200,
            height: 100,
          }}
          thumbnail={{
            src: "thumbnail.jpg",
            alt: "thumbnail",
            width: 100,
            height: 50,
          }}
        />
      );

      const user = userEvent.setup();
      await user.click(screen.getByRole("img", { name: "thumbnail" }));

      const original = screen.getByRole("img", { name: "original" });
      expect(original).toHaveAttribute("src", "original.jpg");
      expect(original).toHaveAttribute("width", "200");
      expect(original).toHaveAttribute("height", "100");
    });
  });

  describe("when a user clicks a close button", () => {
    it("hides a original image", async () => {
      render(
        <ProductImage
          original={{
            src: "original.jpg",
            alt: "original",
            width: 200,
            height: 100,
          }}
          thumbnail={{
            src: "thumbnail.jpg",
            alt: "thumbnail",
            width: 100,
            height: 50,
          }}
        />
      );

      const user = userEvent.setup();
      await user.click(screen.getByRole("img", { name: "thumbnail" }));
      await user.click(await screen.findByRole("button", { name: "CLOSE" }));
      expect(
        screen.queryByRole("img", { name: "original" })
      ).not.toBeInTheDocument();
    });
  });
});
