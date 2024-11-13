// src/hooks/useKeyboardShortcuts.js
import { useEffect } from "react";

const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Vérifie si l'utilisateur n'est pas en train de saisir du texte
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Gestion des raccourcis
      shortcuts.forEach(({ key, ctrlKey, action }) => {
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          event.ctrlKey === !!ctrlKey
        ) {
          event.preventDefault();
          action();
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
};

export default useKeyboardShortcuts;
