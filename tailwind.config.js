import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Ubuntu Sans"', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Bleu principal du logo AGES (#0097B2)
                'ages-blue': {
                    50: '#EBFCFF',
                    100: '#CCF7FF',
                    200: '#99F0FF',
                    300: '#5CE6FF',
                    400: '#1FDDFF',
                    500: '#0097B2',
                    600: '#007C92',
                    700: '#006475',
                    800: '#004F5D',
                    900: '#003C47',
                },
                // Cyan du logo AGES (#09B7E3)
                'ages-cyan': {
                    50: '#EBFBFF',
                    100: '#CDF4FE',
                    200: '#9BE9FD',
                    300: '#5EDDFD',
                    400: '#22D0FC',
                    500: '#09B7E3',
                    600: '#0399BF',
                    700: '#027B99',
                    800: '#026179',
                    900: '#014A5D',
                },
                // Rouge du logo AGES (#FF3131)
                'ages-red': {
                    50: '#FFEBEB',
                    100: '#FFCCCC',
                    200: '#FF9999',
                    300: '#FF5C5C',
                    400: '#FF1F1F',
                    500: '#FF3131',
                    600: '#F90000',
                    700: '#C90000',
                    800: '#9E0000',
                    900: '#7A0000',
                },
            },
        },

        plugins: [forms],
    }
}