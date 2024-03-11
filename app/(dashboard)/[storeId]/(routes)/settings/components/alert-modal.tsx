"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/modal";
import { useEffect, useState } from "react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure?"
      description="you will lose all data in this store"
      isOpen={isOpen}
      onClose={onClose}
    >
      <DialogFooter>
        <Button disabled={loading} variant="outline" onClick={onClose}>
          cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          continue
        </Button>
      </DialogFooter>
    </Modal>
  );
};
