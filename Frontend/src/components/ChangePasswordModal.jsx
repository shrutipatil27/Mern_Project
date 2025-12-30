
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../services/authService";

function ChangePasswordModal({ show, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const email = sessionStorage.getItem("email");

  if (!show) return null;

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      toast.warning("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const result = await changePassword(
        email,
        newPassword,
        confirmPassword
      );

      console.log("Change password result:", result);

      if (result.status === "success") {
        toast.success("Password changed successfully");

        //Auto logout after password change
        sessionStorage.clear();
        onClose();
        window.location.href = "/StudentLogin";
      } else {
        toast.error(result.error || "Failed to update password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Change Password</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <input
              type="password"
              className="form-control mb-3"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
