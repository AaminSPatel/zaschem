// Helper component to make headings/text automatically readable on theme backgrounds.
// Usage: <TextOnBg as="h2" className="...">Hello</TextOnBg>

export default function TextOnBg({ as: As = 'h2', className = '', children, ...rest }) {
  return (
    <As className={`text-on-bg ${className}`.trim()} {...rest}>
      {children}
    </As>
  );
}

