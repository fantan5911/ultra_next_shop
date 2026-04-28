interface Props {
  value: string;
  children: React.ReactNode;
  onClick: () => void;
  brandId: string;
}

export function Option({ value, children, onClick, brandId }: Props) {
  return (
    <li
      onClick={onClick}
      className="px-3 py-2 cursor-pointer text-white/80 hover:bg-white/10"
      data-value={value}
      data-brand-id={brandId}
    >
      {children}
    </li>
  );
}