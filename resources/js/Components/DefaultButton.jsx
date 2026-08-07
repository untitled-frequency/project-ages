import { Link } from "@inertiajs/react";

export default function DefaultButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Link>
    );
}
