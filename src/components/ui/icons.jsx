export const HeartIcon = ({ onclick, size = 24, color = "black", className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    onClick={onclick}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 21s-6.716-4.35-9.428-7.063C.86 12.225 0 10.404 0 8.5 0 5.462 2.462 3 5.5 3c1.74 0 3.41.81 4.5 2.09C11.09 3.81 12.76 3 14.5 3 17.538 3 20 5.462 20 8.5c0 1.904-.86 3.725-2.572 5.437C18.716 16.65 12 21 12 21z" />
  </svg>
);

export const CommentIcon = ({ onclick,size = 24, color = "black", className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    onClick={onclick}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M20 2H4C2.9 2 2 2.9 2 4v13c0 1.1.9 2 2 2h3v3l4-3h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

