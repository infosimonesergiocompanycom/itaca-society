import { cn } from "@/lib/format";

export function Field({
  name,
  label,
  type = "text",
  error,
  defaultValue,
  optional,
  placeholder,
  autoComplete,
  hint,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
  defaultValue?: string;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="flex justify-between text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-tortora">facoltativo</span>}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn("field", error && "border-red-700")}
      />
      {hint && !error && <span className="mt-1 block text-xs text-tortora">{hint}</span>}
      {error && (
        <span className="mt-1 block text-xs text-red-800" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
