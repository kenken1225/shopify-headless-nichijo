import { useSyncExternalStore } from "react";
import { MenuItem } from "@/lib/shopify/navigation";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { X } from "lucide-react";
import { MobileMenuItem } from "./MobileMenuItem";

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function MobileDrawer({
  isOpen,
  onClose,
  menuItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}) {
  const mounted = useIsMounted();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div className={clsx("fixed inset-0 z-50 md:hidden", isOpen ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        className={clsx(
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-label="Close menu overlay"
      />
      <div
        className={clsx(
          "absolute inset-y-0 right-0 w-full max-w-[300px] bg-card shadow-xl transition-transform duration-300 ease-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <span className="text-lg font-semibold text-foreground">Menu</span>
          <button type="button" onClick={onClose} className="text-foreground p-1" aria-label="Close menu">
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col p-4">
          {/* Menu items */}
          <div>
            {menuItems.map((item) => (
              <MobileMenuItem key={item.id} item={item} onClose={onClose} />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
