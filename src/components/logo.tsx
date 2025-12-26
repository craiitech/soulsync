import { cn } from "@/lib/utils"

export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("w-10 h-10", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M16.5 5.25c-1.5 0-2.873.736-3.75 1.88-1.026-1.143-2.25-1.88-3.75-1.88C6.364 5.25 4.5 7.114 4.5 9.75c0 3.033 2.653 5.343 7.5 9.75 4.847-4.407 7.5-6.717 7.5-9.75 0-2.636-1.864-4.5-4.5-4.5Z"
        fill="url(#grad1)"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="0.5"
        transform="translate(-1, -1)"
      />
      <path
        d="M16.5 5.25c-1.5 0-2.873.736-3.75 1.88-1.026-1.143-2.25-1.88-3.75-1.88C6.364 5.25 4.5 7.114 4.5 9.75c0 3.033 2.653 5.343 7.5 9.75 4.847-4.407 7.5-6.717 7.5-9.75 0-2.636-1.864-4.5-4.5-4.5Z"
        fill="url(#grad1)"
        fillOpacity="0.7"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="0.5"
        transform="translate(1, 1)"
      />
    </svg>
  );
};
