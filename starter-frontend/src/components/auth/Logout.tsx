//@ts-nocheck
import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";

import { useAuth } from "../../contexts/AuthContext";

export default function Logout({ modal, setModal }) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const { logout, setError } = useAuth();

  async function handleLogout() {
    try {
      setError("");
      await logout();
      setModal(false);
      navigate("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <div>
        {/* logout popup */}
    </div>
  );
}