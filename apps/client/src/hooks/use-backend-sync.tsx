import { useRegistrationStore } from "@/stores/use-registration-store";
import { useEffect } from "react";

export const useBackendSync = () => {
  const {
    registrationData,
    pendingBackendSync,
    setPendingBackendSync,
    clearRegistrationData,
  } = useRegistrationStore();

  useEffect(() => {
    const syncWithBackend = async () => {
      if (pendingBackendSync && registrationData) {
        try {
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
          });

          if (response.ok) {
            setPendingBackendSync(false);
            clearRegistrationData();
          }
        } catch (error) {
          console.error("Failed to sync with backend:", error);
        }
      }
    };

    syncWithBackend();
  }, [
    pendingBackendSync,
    registrationData,
    clearRegistrationData,
    setPendingBackendSync,
  ]);
};
