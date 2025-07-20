// React
import React, { useState } from "react";

// Styles
import "../assets/css/components/settings-modal.css";

type SettingsModalProps = {
  workTime: number;
  breakTime: number;
  onSave: (work: number, brk: number) => void;
  onClose: () => void;
};

const SettingsModal: React.FC<SettingsModalProps> = ({
  workTime,
  breakTime,
  onSave,
  onClose,
}) => {
  const [work, setWork] = useState(workTime);
  const [brk, setBrk] = useState(breakTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (work > 0 && brk > 0) {
      onSave(work, brk);
    }
  };

  return (
    <div className="settings-modal-backdrop">
      <div className="settings-modal">
        <h2>Settings</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Work Time (seconds) :
            <input
              type="number"
              min={1}
              value={work}
              onChange={(e) => setWork(Number(e.target.value))}
            />
          </label>
          <label>
            Break Time (seconds) :
            <input
              type="number"
              min={1}
              value={brk}
              onChange={(e) => setBrk(Number(e.target.value))}
            />
          </label>
          <div className="settings-modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
