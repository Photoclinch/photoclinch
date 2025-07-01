import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-brand-primary hover:bg-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105',
    secondary: 'bg-white hover:bg-brand-gray text-brand-navy border border-gray-200 shadow-sm hover:shadow-md',
    outline: 'bg-transparent hover:bg-blue-50 text-brand-primary hover:text-blue-600 border border-brand-primary',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl',
    success: 'bg-brand-mint hover:bg-green-600 text-white shadow-lg hover:shadow-xl',
  };

  const sizes = {
    sm: 'py-2 px-4 text-sm font-medium',
    md: 'py-3 px-6 text-base font-medium',
    lg: 'py-4 px-8 text-lg font-semibold',
    xl: 'py-5 px-10 text-xl font-semibold',
  };

  return (
    <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
        ${disabled || isLoading ? 'opacity-70 cursor-not-allowed transform-none' : ''}
        ${className}
        hover:animate-fade-in-up
      `}
      aria-label={typeof children === 'string' ? children : undefined}
      disabled={disabled || isLoading}
      {...props}
    >
      <div className="flex items-center justify-center">
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </div>
    </button>
  );
};

export default Button;