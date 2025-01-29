import * as LucideIcons from "lucide-react";

interface MultimediaButtonProps {
  iconName: keyof typeof LucideIcons;
  size?: number;
  onClick?: () => void;
}

export default function MultimediaButton({
  iconName,
  size,
  onClick,
}: MultimediaButtonProps) {
  const Icon = LucideIcons[iconName] as React.ElementType;

  if (!Icon) {
    return null;
  }

  return (
    <button onClick={onClick}>
      <Icon size={size} className="hover:text-blue-600" />
    </button>
  );
}
