module.exports = {
    content: ['src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                neutral: '#babecc'
            },
            fontFamily: {
                sans: ['Noto Sans', 'sans-serif']
            }
        }
    },
    plugins: [require('daisyui')]
}
