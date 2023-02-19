import { useState } from "react";
import { Dialog } from "@headlessui/react";

type Image = {
  src?: string | null | undefined;
  alt?: string | null | undefined;
  width?: string | number | null | undefined;
  height?: string | number | null | undefined;
};

type Props = {
  original: Image;
  thumbnail: Image;
};

export const ProductImage = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { original, thumbnail } = props;

  return (
    <>
      {isModalOpen && (
        <Dialog
          className="fixed top-0 left-0 h-full w-full bg-slate-900/80"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Dialog.Panel className="fixed left-1/2 top-1/2 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2">
            <div className="relative mx-10 animate-zoom-in rounded object-cover">
              <img
                src={original.src ?? undefined}
                width={original.width ?? undefined}
                height={original.height ?? undefined}
                alt={original.alt ?? undefined}
                className="rounded"
                loading="lazy"
              />
              <span
                aria-hidden
                className="absolute bottom-2 left-2 inline-block rounded bg-slate-900/20 py-1 px-3 text-sm text-white"
              >
                {original.alt}
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 inline-block rounded bg-slate-900/60 py-2 px-3 text-sm text-white"
              >
                CLOSE
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
      <button className="h-full w-full" onClick={() => setIsModalOpen(true)}>
        <img
          src={thumbnail.src ?? undefined}
          width={thumbnail.width ?? undefined}
          height={thumbnail.height ?? undefined}
          alt={thumbnail.alt ?? undefined}
          className="h-full w-full cursor-pointer object-cover object-center"
          decoding="async"
        />
      </button>
    </>
  );
};
