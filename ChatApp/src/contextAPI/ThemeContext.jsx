import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const getInitialTheme = () => {
    try {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : "dark";
    } catch (error) {
        console.error("Failed to read theme from localStorage:", error);
        return "dark";
    }
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        try {
            const root = document.documentElement;
            if (theme === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
            localStorage.setItem("theme", theme);
        } catch (error) {
            console.error("Failed to apply theme:", error);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    const setLightTheme = () => setTheme("light");
    const setDarkTheme = () => setTheme("dark");

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setLightTheme, setDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
