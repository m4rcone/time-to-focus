import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 text-xl">
      <a 
        href="https://github.com/m4rcone/time-to-focus"
        target="_blank"
      >
        <Github />
      </a>
    </footer>
  );
}
